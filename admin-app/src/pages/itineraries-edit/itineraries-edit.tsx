import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller } from 'react-hook-form'

import {
  Alert,
  Button,
  Card,
  DashboardWrapper,
  Input,
  InputCurrency,
  InputDate,
  Select,
} from '../../components'
import { formatDateAmerican } from '../../utils'

import { STRINGS } from './strings'
import {
  useForm,
  useGetItinerary,
  useListGroups,
  useListItinerariesRules,
  useUpdateItineraries,
  useUpdateItinerariesRule,
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

const calculateDiscountInReals = (rawAmount: string, rawPercentage: string) => {
  const amount = rawAmount
    ? Number(rawAmount.replace('R$ ', '').replace('.', '').replace(',', '.'))
    : 0
  const percentage = rawPercentage ? Number(rawPercentage.replace('%', '').replace('_', '')) : 0
  const discount = amount * (percentage / 100)

  return discount
}

export const ItinerariesEdit = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { id } = useParams()
  const [updatedWithSuccess, setUpdatedWithSuccess] = React.useState(false)
  const {
    data: dataItinerary,
    error: errorItinerary,
    isFetching: isFetchingItinerary,
  } = useGetItinerary(id || '')
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
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm()
  const navigate = useNavigate()
  const firstAmount = watch('rules.0.seat_price')
  const secondAmount = watch('rules.1.seat_price')
  const firstDiscountPercentage = watch('rules.0.pix_discount')
  const secondDiscountPercentage = watch('rules.1.pix_discount')
  const firstDiscountAmount = calculateDiscountInReals(firstAmount, firstDiscountPercentage)
  const secondDiscountAmount = calculateDiscountInReals(secondAmount, secondDiscountPercentage)

  React.useEffect(() => {
    const formatedRules = dataItinerariesRules?.data?.map((rule) => {
      const pixDiscount = Number(rule.pix_discount) * 100

      return {
        ...rule,
        pix_discount: `${pixDiscount}`,
      }
    })

    reset({
      ...(dataItinerary?.data || {}),
      rules: [...(formatedRules || [])],
    })
  }, [dataItinerary?.data, dataItinerariesRules?.data])

  const handleOnCancel = () => navigate(-1)
  const handleOnSubmit = async (rawData: any) => {
    setIsLoading(true)

    const { rules: rawRules, ...restRawData } = rawData
    const itineraryData = {
      ...restRawData,
      boarding_date: formatDateAmerican(restRawData.boarding_date),
      landing_date: formatDateAmerican(restRawData.landing_date),
    }
    const rulesData = rawRules.map((rule: any) => ({
      ...rule,
      pix_discount: Number(rule.pix_discount.replace('%', '')) / 100,
      purchase_deadline: formatDateAmerican(rule.purchase_deadline),
      seat_price: rule.seat_price.replace('R$ ', '').replace('.', '').replace(',', '.'),
    }))

    try {
      await mutateAsyncUpdateItineraries({
        id: id || '',
        payload: itineraryData,
      })
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

    setIsLoading(false)
  }

  const isFetching = isFetchingItinerary || isFetchingItinerariesRules || isFetchingGroups
  const hasError = errorItinerary || errorItinerariesRules || errorGroups || errorUpdateItineraries || errorUpdateItinerariesRule
  const groups = dataGroups?.data
    ? dataGroups?.data.map((group) => ({
      label: group.description,
      value: group.id,
    }))
    : []
  const hasSecondRule = dataItinerariesRules?.data?.[1]

  return (
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
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(handleOnSubmit)}
            >
              <Card>
                <div className="p-4 flex flex-col gap-4">
                  <h2 className="font-semibold text-xl mb-2 dark:text-white">
                    {STRINGS.section_geral_data_title}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      id="title"
                      label={STRINGS.form_input_itinerary_name_label}
                      placeholder={
                        STRINGS.form_input_itinerary_name_placeholder
                      }
                      type="text"
                      error={errors.title?.message}
                      {...register('title')}
                    />
                    <Select
                      id="group_id"
                      label={STRINGS.form_input_group_name_label}
                      placeholder={STRINGS.form_input_group_name_placeholder}
                      options={groups}
                      error={errors.group_id?.message}
                      {...register('group_id')}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Controller
                      name="boarding_date"
                      control={control}
                      render={({ field: { value, ...rest } }) => (
                        <InputDate
                          id="boarding_date"
                          label={STRINGS.form_input_board_date_label}
                          value={value ? getCorrectDate(value) : new Date()}
                          error={errors.boarding_date?.message}
                          {...rest}
                        />
                      )}
                    />
                    <Controller
                      name="landing_date"
                      control={control}
                      render={({ field: { value, ...rest } }) => (
                        <InputDate
                          id="landing_date"
                          label={STRINGS.form_input_landing_date_label}
                          value={value ? getCorrectDate(value) : new Date()}
                          error={errors.landing_date?.message}
                          {...rest}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Input
                      id="seats"
                      label={STRINGS.form_input_seats_label}
                      placeholder={STRINGS.form_input_seats_placeholder}
                      type="number"
                      error={errors.seats?.message}
                      {...register('seats')}
                    />
                  </div>
                </div>
              </Card>
              <Card>
                <div className="p-4 flex flex-col gap-4">
                  <h2 className="font-semibold text-xl mb-2 dark:text-white">
                    {STRINGS.section_financial_data_title}
                  </h2>
                  <div className={`grid ${hasSecondRule ? 'md:grid-cols-2' : 'md:grid-cols-1'}  gap-4`}>
                    <div className="flex flex-col gap-4">
                      <Controller
                        name="rules.0.purchase_deadline"
                        control={control}
                        render={({ field: { value, ...rest } }) => (
                          <InputDate
                            id="rules.0.purchase_deadline"
                            label={
                              STRINGS.form_input_first_subscription_deadline_label
                            }
                            value={value ? getCorrectDate(value) : new Date()}
                            error={
                              errors.rules?.[0]?.purchase_deadline?.message
                            }
                            {...rest}
                          />
                        )}
                      />
                      <Controller
                        name="rules.0.seat_price"
                        control={control}
                        render={({ field: { value, ...rest } }) => (
                          <InputCurrency
                            id="rules.0.seat_price"
                            label={
                              STRINGS.form_input_first_subscription_value_label
                            }
                            placeholder={
                              STRINGS.form_input_first_subscription_value_placeholder
                            }
                            error={errors.rules?.[0]?.seat_price?.message}
                            defaultValue={value}
                            {...rest}
                          />
                        )}
                      />
                      <Controller
                        name="rules.0.pix_discount"
                        control={control}
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
                            error={errors.rules?.[0]?.pix_discount?.message}
                            {...rest}
                          />
                        )}
                      />
                      <InputCurrency
                        label={STRINGS.form_input_first_subscription_amount_with_discount_label}
                        placeholder={STRINGS.form_input_first_subscription_percentage_discount_placeholder}
                        value={Number(firstAmount) - firstDiscountAmount}
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
                        error={errors.rules?.[0]?.installments?.message}
                        {...register('rules.0.installments')}
                      />
                    </div>
                    {
                      hasSecondRule && (
                      <div className="flex flex-col gap-4">
                        <Controller
                          name="rules.1.purchase_deadline"
                          control={control}
                          render={({ field: { value, ...rest } }) => (
                            <InputDate
                              id="rules.1.purchase_deadline"
                              label={
                              STRINGS.form_input_second_subscription_deadline_label
                            }
                              value={value ? getCorrectDate(value) : new Date()}
                              error={
                              errors.rules?.[1]?.purchase_deadline?.message
                            }
                              {...rest}
                            />
                          )}
                        />
                        <Controller
                          name="rules.1.seat_price"
                          control={control}
                          render={({ field: { value, ...rest } }) => (
                            <InputCurrency
                              id="rules.1.seat_price"
                              label={
                              STRINGS.form_input_second_subscription_value_label
                            }
                              placeholder={
                              STRINGS.form_input_second_subscription_value_placeholder
                            }
                              error={errors.rules?.[1]?.seat_price?.message}
                              defaultValue={value}
                              {...rest}
                            />
                          )}
                        />
                        <Controller
                          name="rules.1.pix_discount"
                          control={control}
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
                              error={errors.rules?.[1]?.pix_discount?.message}
                              {...rest}
                            />
                          )}
                        />
                        <InputCurrency
                          label={STRINGS.form_input_second_subscription_amount_with_discount_label}
                          placeholder={STRINGS.form_input_second_subscription_percentage_discount_placeholder}
                          value={Number(secondAmount) - secondDiscountAmount}
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
                          error={errors.rules?.[1]?.message}
                          {...register('rules.1.installments')}
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
        )}
      </main>
    </DashboardWrapper>
  )
}
