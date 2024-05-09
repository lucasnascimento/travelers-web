import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller } from 'react-hook-form'

import {
  Alert,
  Button,
  Card,
  ConfirmationModal,
  DashboardWrapper,
  Input,
  InputCurrency,
  InputDate,
  Modal,
  RegisterListTable,
  RegisterListTableCol,
  RegisterListTableRow,
  RichTextEditor,
  Select,
  useModal,
} from '../../components'
import { formatDateAmerican, scrollToTop } from '../../utils'

import { STRINGS } from './strings'
import {
  useCreateItinerariesDocuments,
  useFormItinerary,
  useFormItineraryDocuments,
  useFormItineraryRules,
  useGetItinerary,
  useListGroups,
  useListItinerariesDocuments,
  useListItinerariesRules,
  useRemoveItinerariesRule,
  useUpdateItineraries,
  useUpdateItinerariesRule,
  useUploadItinerariesDocuments,
} from './hooks'

const getCorrectDate = (rawDate: string | Date) => {
  const date = new Date(rawDate)
  const offset = date.getTimezoneOffset()
  date.setMinutes(date.getMinutes() + offset)

  return date
}

const padLeftPercentage = (str: string) => {
  const parts = str.split('.')
  const firstPart = parts[0].padStart(2, '0')

  return `${firstPart}.${parts[1]}`
}

const installments = [
  {
    label: '1x',
    value: 1,
  },
  {
    label: '2x',
    value: 2,
  },
  {
    label: '3x',
    value: 3,
  },
  {
    label: '4x',
    value: 4,
  },
  {
    label: '5x',
    value: 5,
  },
  {
    label: '6x',
    value: 6,
  },
  {
    label: '7x',
    value: 7,
  },
  {
    label: '8x',
    value: 8,
  },
  {
    label: '9x',
    value: 9,
  },
  {
    label: '10x',
    value: 10,
  },
  {
    label: '11x',
    value: 11,
  },
  {
    label: '12x',
    value: 12,
  },
]

const cleanCurrency = (rawAmount: string) => Number(rawAmount.replace('R$ ', '').replace('.', '').replace(',', '.'))
const calculateDiscountInReals = (rawAmount: string, rawPercentage: string) => {
  const amount = rawAmount ? cleanCurrency(rawAmount) : 0
  const percentage = rawPercentage ? Number(rawPercentage.replace('%', '').replace('_', '')) : 0
  const discount = amount * (percentage / 100)

  return discount
}

export const ItinerariesEdit = () => {
  const [documentIdToRemove, setDocumentIdToRemove] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [updatedWithSuccess, setUpdatedWithSuccess] = React.useState(false)
  const {
    data: dataItinerary,
    error: errorItinerary,
    isFetching: isFetchingItinerary,
  } = useGetItinerary(id || '')
  const {
    data: dataItinerariesDocuments,
    error: errorItinerariesDocuments,
    isFetching: isFetchingItinerariesDocuments,
    refetch: refetchItinerariesDocuments,
  } = useListItinerariesDocuments(id || '')
  const {
    data: dataGroups,
    error: errorGroups,
    isFetching: isFetchingGroups,
  } = useListGroups()
  const {
    data: dataItinerariesRules,
    error: errorItinerariesRules,
    isFetching: isFetchingItinerariesRules,
  } = useListItinerariesRules(id || '')
  const {
    error: errorUpdateItineraries,
    mutateAsync: mutateAsyncUpdateItineraries,
  } = useUpdateItineraries()
  const {
    error: errorUpdateItinerariesRule,
    mutateAsync: mutateAsyncUpdateItinerariesRule,
  } = useUpdateItinerariesRule()
  const {
    error: errorRemoveItinerariesDocuments,
    isPending: isPendingRemoveItinerariesDocuments,
    mutateAsync: mutateAsyncRemoveItinerariesDocuments,
  } = useRemoveItinerariesRule()
  const {
    error: errorCreateItinerariesDocuments,
    mutateAsync: mutateAsyncCreateItinerariesDocuments,
  } = useCreateItinerariesDocuments()
  const {
    error: errorUploadItinerariesDocuments,
    mutateAsync: mutateAsyncUploadItinerariesDocuments,
  } = useUploadItinerariesDocuments()

  const {
    control: controlItinerary,
    formState: { errors: errorsItinerary },
    handleSubmit: handleSubmitItinerary,
    register: registerItinerary,
    reset: resetItinerary,
  } = useFormItinerary()
  const {
    control: controlItineraryRules,
    formState: { errors: errorsItineraryRules },
    handleSubmit: handleSubmitItineraryRules,
    register: registerItineraryRules,
    reset: resetItineraryRules,
    watch: watchItineraryRules,
  } = useFormItineraryRules()
  const {
    formState: { errors: errorsItineraryDocuments },
    handleSubmit: handleSubmitItineraryDocuments,
    register: registerItineraryDocuments,
    reset: resetItineraryDocuments,
  } = useFormItineraryDocuments()
  const {
    isOpen: isOpenConfirmation,
    onClose: onCloseConfirmation,
    onOpen: onOpenConfirmation,
  } = useModal()
  const {
    isOpen: isOpenCreation,
    onClose: onCloseCreation,
    onOpen: onOpenCreation,
  } = useModal()

  const firstAmount = watchItineraryRules('rules.0.seat_price') || ''
  const secondAmount = watchItineraryRules('rules.1.seat_price') || ''
  const firstDiscountPercentage = watchItineraryRules('rules.0.pix_discount') || ''
  const secondDiscountPercentage = watchItineraryRules('rules.1.pix_discount') || ''
  const firstDiscountAmount = calculateDiscountInReals(firstAmount, firstDiscountPercentage)
  const secondDiscountAmount = calculateDiscountInReals(secondAmount, secondDiscountPercentage)
  const firstAmountWithDiscount = (cleanCurrency(firstAmount) - firstDiscountAmount).toFixed(2)
  const secondAmountWithDiscount = (cleanCurrency(secondAmount) - secondDiscountAmount).toFixed(2)

  React.useEffect(() => {
    const formatedRules = dataItinerariesRules?.data?.map((rule) => {
      const pixDiscount = Number(rule.pix_discount) * 100

      return {
        ...rule,
        pix_discount: `${pixDiscount}`,
      }
    })

    resetItineraryRules({
      rules: [...(formatedRules || [])],
    })
  }, [dataItinerariesRules?.data])

  React.useEffect(() => {
    resetItinerary({
      ...(dataItinerary?.data || {}),
    })
  }, [dataItinerary?.data])

  const handleOnCancel = () => navigate(-1)
  const handleOnSubmitItinerary = async (rawData: any) => {
    setIsLoading(true)

    const itineraryData = {
      ...rawData,
      boarding_date: formatDateAmerican(rawData.boarding_date),
      landing_date: formatDateAmerican(rawData.landing_date),
    }

    try {
      await mutateAsyncUpdateItineraries({
        id: id || '',
        payload: itineraryData,
      })

      setUpdatedWithSuccess(true)
    } catch (err) {
      setUpdatedWithSuccess(false)
    }

    scrollToTop()
    setIsLoading(false)
  }
  const handleOnSubmitItineraryRules = async (rawData: any) => {
    setIsLoading(true)

    const rulesData = rawData.rules.map((rule: any) => ({
      ...rule,
      pix_discount: Number(rule.pix_discount.replace('%', '')) / 100,
      purchase_deadline: formatDateAmerican(rule.purchase_deadline),
      seat_price: rule.seat_price.replace('R$ ', '').replace('.', '').replace(',', '.'),
    }))

    try {
      await mutateAsyncUpdateItinerariesRule({
        itineraryId: id || '',
        payload: rulesData[0],
        ruleId: dataItinerariesRules?.data?.[0]?.id || '',
      })

      if (rulesData[1]) {
        await mutateAsyncUpdateItinerariesRule({
          itineraryId: id || '',
          payload: rulesData[1],
          ruleId: dataItinerariesRules?.data?.[1]?.id || '',
        })
      }

      setUpdatedWithSuccess(true)
    } catch (err) {
      setUpdatedWithSuccess(false)
    }

    scrollToTop()
    setIsLoading(false)
  }
  const handleOnRemoveDocument = async () => {
    try {
      await mutateAsyncRemoveItinerariesDocuments({
        documentId: documentIdToRemove || '',
        itineraryId: id || '',
      })

      refetchItinerariesDocuments()

      setUpdatedWithSuccess(true)
    } finally {
      onCloseConfirmation()
    }
  }
  const handleOnClickCreateDocument = () => {
    onOpenCreation()
  }
  const handleOnSubmitItineraryDocuments = async (rawData: any) => {
    setIsLoading(true)

    try {
      const createDocumentPayload = {
        description: rawData.description,
        link: rawData.link,
        position: 1,
        title: rawData.title,
      }

      const createdDocument = await mutateAsyncCreateItinerariesDocuments({
        itineraryId: id || '',
        payload: createDocumentPayload,
      })

      if (rawData.file[0]) {
        const formData = new FormData()
        formData.append('file', rawData.file[0])

        await mutateAsyncUploadItinerariesDocuments({
          documentId: createdDocument.data.id,
          itineraryId: id || '',
          payload: formData,
        })
      }

      resetItineraryDocuments()
      setUpdatedWithSuccess(true)
      refetchItinerariesDocuments()
      scrollToTop()
    } catch {
      setUpdatedWithSuccess(false)
    } finally {
      setIsLoading(false)
      onCloseCreation()
    }
  }

  const isFetching = isFetchingItinerary || isFetchingItinerariesRules || isFetchingGroups || isFetchingItinerariesDocuments
  const hasError = errorItinerary
    || errorItinerariesRules
    || errorGroups
    || errorUpdateItineraries
    || errorUpdateItinerariesRule
    || errorItinerariesDocuments
    || errorRemoveItinerariesDocuments
    || errorCreateItinerariesDocuments
    || errorUploadItinerariesDocuments
  const groups = dataGroups?.data
    ? dataGroups?.data.map((group) => ({
      label: group.description,
      value: group.id,
    }))
    : []
  const hasSecondRule = dataItinerariesRules?.data?.[1]

  return (
    <>
      <Modal
        isOpen={isOpenCreation}
        onClose={onCloseCreation}
        title={STRINGS.modal_create_document_title}
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitItineraryDocuments(handleOnSubmitItineraryDocuments)}
        >
          <div className="flex flex-col gap-8">
            <Input
              id="title"
              label={STRINGS.modal_create_document_input_title_label}
              placeholder={STRINGS.modal_create_document_input_title_placeholder}
              type="text"
              error={errorsItineraryDocuments.title?.message}
              {...registerItineraryDocuments('title')}
            />
            <Input
              id="description"
              label={STRINGS.modal_create_document_input_description_label}
              placeholder={STRINGS.modal_create_document_input_description_placeholder}
              type="text"
              error={errorsItineraryDocuments.description?.message}
              {...registerItineraryDocuments('description')}
            />
            <Input
              id="link"
              label={STRINGS.modal_create_document_input_link_label}
              placeholder={STRINGS.modal_create_document_input_link_placeholder}
              type="text"
              error={errorsItineraryDocuments.link?.message}
              {...registerItineraryDocuments('link')}
            />
            <Input
              id="file"
              label={STRINGS.modal_create_document_input_file_label}
              placeholder={STRINGS.modal_create_document_input_file_placeholder}
              type="file"
              error={errorsItineraryDocuments.file?.message}
              {...registerItineraryDocuments('file')}
            />
          </div>
          <div className="flex justify-between">
            <Button
              label={STRINGS.button_cancel_label}
              type="button"
              variant="outline"
              onClick={onCloseCreation}
            />
            <Button label={STRINGS.form_button_label} type="submit" loading={isLoading} />
          </div>
        </form>
      </Modal>
      <ConfirmationModal
        isOpen={isOpenConfirmation}
        onCancel={onCloseConfirmation}
        onContinue={handleOnRemoveDocument}
        loading={isPendingRemoveItinerariesDocuments}
      />
      <DashboardWrapper
        title={STRINGS.title}
        breadcrumbs={[{ title: STRINGS.title }]}
      >
        <main className="flex flex-col gap-8 pb-12">
          {updatedWithSuccess && (
            <Alert title={STRINGS.updated_success} type="success" />
          )}
          {hasError && (
            <Alert title={STRINGS.updated_error} type="error" />
          )}
          {isFetching && (
            <div className="flex animate-pulse">
              <span className="w-full h-52 rounded-xl py-40 bg-gray-200 dark:bg-gray-700" />
            </div>
          )}
          {!isFetchingItinerary
          && !isFetchingItinerariesRules
          && dataItinerary
          && dataItinerariesRules && (
            <div className="flex flex-col gap-12">
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmitItinerary(handleOnSubmitItinerary)}
              >
                <Card>
                  <div className="p-4 flex flex-col gap-8">
                    <h2 className="font-semibold text-xl mb-2 dark:text-white">
                      {STRINGS.section_geral_data_title}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      <Input
                        id="title"
                        label={STRINGS.form_input_itinerary_name_label}
                        placeholder={
                          STRINGS.form_input_itinerary_name_placeholder
                        }
                        type="text"
                        error={errorsItinerary.title?.message}
                        {...registerItinerary('title')}
                      />
                      <Select
                        id="group_id"
                        label={STRINGS.form_input_group_name_label}
                        placeholder={STRINGS.form_input_group_name_placeholder}
                        options={groups}
                        error={errorsItinerary.group_id?.message}
                        {...registerItinerary('group_id')}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <Controller
                        name="boarding_date"
                        control={controlItinerary}
                        render={({ field: { value, ...rest } }) => (
                          <InputDate
                            id="boarding_date"
                            label={STRINGS.form_input_board_date_label}
                            value={value ? getCorrectDate(value) : new Date()}
                            error={errorsItinerary.boarding_date?.message}
                            {...rest}
                          />
                        )}
                      />
                      <Controller
                        name="landing_date"
                        control={controlItinerary}
                        render={({ field: { value, ...rest } }) => (
                          <InputDate
                            id="landing_date"
                            label={STRINGS.form_input_landing_date_label}
                            value={value ? getCorrectDate(value) : new Date()}
                            error={errorsItinerary.landing_date?.message}
                            {...rest}
                          />
                        )}
                      />
                    </div>
                    <Input
                      id="seats"
                      label={STRINGS.form_input_seats_label}
                      placeholder={STRINGS.form_input_seats_placeholder}
                      type="number"
                      error={errorsItinerary.seats?.message}
                      {...registerItinerary('seats')}
                    />
                    <Controller
                      name="details"
                      control={controlItinerary}
                      render={({ field: { onChange, ...rest } }) => (
                        <RichTextEditor
                          label={STRINGS.form_input_details_label}
                          error={errorsItinerary.details?.message}
                          onChange={(event) => onChange({ target: { value: event } })}
                          content={dataItinerary?.data?.details}
                          {...rest}
                        />
                      )}
                    />
                    <Controller
                      name="summary"
                      control={controlItinerary}
                      render={({ field: { onChange, ...rest } }) => (
                        <RichTextEditor
                          label={STRINGS.form_input_summary_label}
                          error={errorsItinerary.summary?.message}
                          onChange={(event) => onChange({ target: { value: event } })}
                          content={dataItinerary?.data?.summary}
                          {...rest}
                        />
                      )}
                    />
                    <Controller
                      name="services"
                      control={controlItinerary}
                      render={({ field: { onChange, ...rest } }) => (
                        <RichTextEditor
                          label={STRINGS.form_input_services_label}
                          error={errorsItinerary.services?.message}
                          onChange={(event) => onChange({ target: { value: event } })}
                          content={dataItinerary?.data?.services}
                          {...rest}
                        />
                      )}
                    />
                    <Controller
                      name="terms_and_conditions"
                      control={controlItinerary}
                      render={({ field: { onChange, ...rest } }) => (
                        <RichTextEditor
                          label={STRINGS.form_input_terms_and_conditions_label}
                          error={errorsItinerary.terms_and_conditions?.message}
                          onChange={(event) => onChange({ target: { value: event } })}
                          content={dataItinerary?.data?.terms_and_conditions}
                          {...rest}
                        />
                      )}
                    />
                    <Controller
                      name="cancelation_rules"
                      control={controlItinerary}
                      render={({ field: { onChange, ...rest } }) => (
                        <RichTextEditor
                          label={STRINGS.form_input_cancelation_rules_label}
                          error={errorsItinerary.cancelation_rules?.message}
                          onChange={(event) => onChange({ target: { value: event } })}
                          content={dataItinerary?.data?.cancelation_rules}
                          {...rest}
                        />
                      )}
                    />
                  </div>
                </Card>
                <div className="flex justify-between">
                  <Button
                    label={STRINGS.button_cancel_label}
                    type="button"
                    variant="outline"
                    onClick={handleOnCancel}
                  />
                  <Button label={STRINGS.form_button_label} type="submit" loading={isLoading} />
                </div>
              </form>
              <Card>
                <div className="p-4 flex flex-col gap-8">
                  <h2 className="font-semibold text-xl mb-2 dark:text-white">
                    {STRINGS.section_documents_data_title}
                  </h2>
                  <RegisterListTable
                    onClickCreate={handleOnClickCreateDocument}
                    loading={isFetching}
                    headers={[
                      STRINGS.table_documents_header_title,
                      STRINGS.table_documents_header_description,
                      STRINGS.table_documents_header_url,
                    ]}
                  >
                    {
                        dataItinerariesDocuments?.data?.map((document) => (
                          <RegisterListTableRow key={document.id}>
                            <RegisterListTableCol>{document.title}</RegisterListTableCol>
                            <RegisterListTableCol>{document.description}</RegisterListTableCol>
                            <RegisterListTableCol>
                              <a
                                className="text-blue-500"
                                href={document.link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {document.link}
                              </a>
                            </RegisterListTableCol>
                            <RegisterListTableCol>
                              <Button
                                label={STRINGS.table_documents_body_button_remove}
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setDocumentIdToRemove(document.id)
                                  onOpenConfirmation()
                                }}
                              />
                            </RegisterListTableCol>
                          </RegisterListTableRow>
                        ))
                      }
                  </RegisterListTable>
                </div>
              </Card>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmitItineraryRules(handleOnSubmitItineraryRules)}
              >
                <Card>
                  <div className="p-4 flex flex-col gap-8">
                    <h2 className="font-semibold text-xl mb-2 dark:text-white">
                      {STRINGS.section_financial_data_title}
                    </h2>
                    <div className={`grid ${hasSecondRule ? 'md:grid-cols-2' : 'md:grid-cols-1'}  gap-4`}>
                      <div className="flex flex-col gap-8">
                        <Controller
                          name="rules.0.purchase_deadline"
                          control={controlItineraryRules}
                          render={({ field: { value, ...rest } }) => (
                            <InputDate
                              id="rules.0.purchase_deadline"
                              label={STRINGS.form_input_first_subscription_deadline_label}
                              value={value ? getCorrectDate(value) : new Date()}
                              error={errorsItineraryRules.rules?.[0]?.purchase_deadline?.message}
                              {...rest}
                            />
                          )}
                        />
                        <Controller
                          name="rules.0.seat_price"
                          control={controlItineraryRules}
                          render={({ field: { value, ...rest } }) => (
                            <InputCurrency
                              id="rules.0.seat_price"
                              label={STRINGS.form_input_first_subscription_value_label}
                              placeholder={STRINGS.form_input_first_subscription_value_placeholder}
                              error={errorsItineraryRules.rules?.[0]?.seat_price?.message}
                              defaultValue={value}
                              {...rest}
                            />
                          )}
                        />
                        <Controller
                          name="rules.0.pix_discount"
                          control={controlItineraryRules}
                          render={({ field: { value, ...rest } }) => (
                            <Input
                              id="rules.0.pix_discount"
                              label={
                              STRINGS.form_input_first_subscription_percentage_discount_label
                            }
                              placeholder={
                              STRINGS.form_input_first_subscription_percentage_discount_placeholder
                            }
                              type="text"
                              mask="99.99%"
                              value={value ? padLeftPercentage(value) : '0'}
                              error={errorsItineraryRules.rules?.[0]?.pix_discount?.message}
                              {...rest}
                            />
                          )}
                        />
                        <InputCurrency
                          label={STRINGS.form_input_first_subscription_amount_with_discount_label}
                          placeholder={STRINGS.form_input_first_subscription_percentage_discount_placeholder}
                          value={firstAmountWithDiscount}
                          disabled
                        />
                        <Select
                          id="rules.0.installments"
                          label={
                          STRINGS.form_input_first_subscription_installments_label
                        }
                          placeholder={
                          STRINGS.form_input_first_subscription_installments_placeholder
                        }
                          options={installments}
                          error={errorsItineraryRules.rules?.[0]?.installments?.message}
                          {...registerItineraryRules('rules.0.installments')}
                        />
                      </div>
                      {
                      hasSecondRule && (
                      <div className="flex flex-col gap-8">
                        <Controller
                          name="rules.1.purchase_deadline"
                          control={controlItineraryRules}
                          render={({ field: { value, ...rest } }) => (
                            <InputDate
                              id="rules.1.purchase_deadline"
                              label={STRINGS.form_input_second_subscription_deadline_label}
                              value={value ? getCorrectDate(value) : new Date()}
                              error={errorsItineraryRules.rules?.[1]?.purchase_deadline?.message}
                              {...rest}
                            />
                          )}
                        />
                        <Controller
                          name="rules.1.seat_price"
                          control={controlItineraryRules}
                          render={({ field: { value, ...rest } }) => (
                            <InputCurrency
                              id="rules.1.seat_price"
                              label={
                              STRINGS.form_input_second_subscription_value_label
                            }
                              placeholder={
                              STRINGS.form_input_second_subscription_value_placeholder
                            }
                              error={errorsItineraryRules.rules?.[1]?.seat_price?.message}
                              defaultValue={value}
                              {...rest}
                            />
                          )}
                        />
                        <Controller
                          name="rules.1.pix_discount"
                          control={controlItineraryRules}
                          render={({ field: { value, ...rest } }) => (
                            <Input
                              id="rules.1.pix_discount"
                              label={
                              STRINGS.form_input_second_subscription_percentage_discount_label
                            }
                              placeholder={
                              STRINGS.form_input_second_subscription_percentage_discount_placeholder
                            }
                              type="text"
                              mask="99.99%"
                              value={value ? padLeftPercentage(value) : '0'}
                              error={errorsItineraryRules.rules?.[1]?.pix_discount?.message}
                              {...rest}
                            />
                          )}
                        />
                        <InputCurrency
                          label={STRINGS.form_input_second_subscription_amount_with_discount_label}
                          placeholder={STRINGS.form_input_second_subscription_percentage_discount_placeholder}
                          value={secondAmountWithDiscount}
                          disabled
                        />
                        <Select
                          id="rules.1.installments"
                          label={
                          STRINGS.form_input_second_subscription_installments_label
                        }
                          placeholder={
                          STRINGS.form_input_second_subscription_installments_placeholder
                        }
                          options={installments}
                          error={errorsItineraryRules.rules?.[1]?.message}
                          {...registerItineraryRules('rules.1.installments')}
                        />
                      </div>
                      )
                    }

                    </div>
                  </div>
                </Card>
                <div className="flex justify-between">
                  <Button
                    label={STRINGS.button_cancel_label}
                    type="button"
                    variant="outline"
                    onClick={handleOnCancel}
                  />
                  <Button label={STRINGS.form_button_label} type="submit" loading={isLoading} />
                </div>
              </form>
            </div>
          )}
        </main>
      </DashboardWrapper>
    </>
  )
}
