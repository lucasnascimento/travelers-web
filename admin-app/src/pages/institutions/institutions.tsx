import * as React from 'react'
// import { TrashIcon } from '@heroicons/react/24/outline'

import {
  Alert,
  Button,
  ConfirmationModal,
  DashboardWrapper,
  Input,
  Modal,
  RegisterListTable,
  RegisterListTableCol,
  RegisterListTableRow,
  // Stats,
  Switch,
  useModal,
} from '../../components'
import { removeSpecialCharacters } from '../../utils'

import { STRINGS } from './strings'
import { useCreateInstitution, useForm, useListInstitutions, useUpdateInstitution } from './hooks'

export const Institutions = () => {
  const [institutionIdToChange, setInstitutionIdToChange] = React.useState<string | null>(null)
  const [institutionStatusToChange, setInstitutionStatusToChange] = React.useState<boolean | null>(null)
  const [registeredWithSuccess, setRegisteredWithSuccess] = React.useState(false)
  const { data, isFetching, refetch } = useListInstitutions()
  const { error: errorOnCreateInstitution, mutateAsync: mutateAsyncCreateInstitution } = useCreateInstitution()
  const {
    error: errorOnUpdateInstitution,
    isPending: isPendingUpdateInstitution,
    mutateAsync: mutateAsyncUpdateInstitution,
  } = useUpdateInstitution()
  // const { isOpen, onClose, onOpen } = useModal()
  const { isOpen, onClose } = useModal()
  const {
    isOpen: isOpenInstitutionConfirmation,
    onClose: onCloseInstitutionConfirmation,
    onOpen: onOpenInstitutionConfirmation,
  } = useModal()
  const {
    formState: { errors },
    handleSubmit,
    register,
    resetField,
    watch,
  } = useForm()
  const hasBankingAccount = watch('has_banking_account')

  const handleOnSubmit = async (rawFormData: any) => {
    mutateAsyncCreateInstitution(rawFormData).then(() => {
      onClose()
      setTimeout(() => {
        setRegisteredWithSuccess(false)
      }, 1000)
    })
  }

  const handleOnChangeStatus = (id: string, status: boolean) => {
    const formData = {
      id,
      payload: {
        active_on_website: status,
      },
    }

    mutateAsyncUpdateInstitution(formData)
      .then(() => refetch())
      .finally(() => onCloseInstitutionConfirmation())
  }

  React.useEffect(() => {
    if (!hasBankingAccount) {
      resetField('banking_account.bank_agency')
      resetField('banking_account.account_number')
      resetField('banking_account.bank_code')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBankingAccount])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={STRINGS.modal_title}>
        {(errorOnCreateInstitution || errorOnUpdateInstitution) && (
          <div className="mb-8">
            <Alert title={STRINGS.registered_error} type="error" />
          </div>
        )}
        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Input
              id="name"
              type="text"
              label="Nome"
              placeholder="Digite o nome"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              id="cnpj"
              type="text"
              label="CNPJ"
              placeholder="Digite o nome"
              mask="99.999.999/9999-99"
              error={errors.cnpj?.message}
              {...register('cnpj', {
                setValueAs: (value) => removeSpecialCharacters(value),
              })}
            />
            <Input
              id="password"
              type="text"
              label="Senha"
              placeholder="Digite a senha"
              error={errors.password?.message}
              {...register('password')}
            />
            <Switch label="Tem conta bancária" {...register('has_banking_account')} />
          </div>
          {hasBankingAccount && (
            <div className="flex flex-col md:flex-row gap-6">
              <Input
                id="bank_agency"
                type="number"
                label="Agência"
                placeholder="Digite a agência"
                error={errors?.banking_account?.bank_agency?.message}
                {...register('banking_account.bank_agency')}
              />
              <Input
                id="account_number"
                type="text"
                label="Conta"
                placeholder="Digite a conta"
                mask="99999-9"
                error={errors?.banking_account?.account_number?.message}
                {...register('banking_account.account_number', {
                  setValueAs: (value) => removeSpecialCharacters(value),
                })}
              />
              <Input
                id="bank_code"
                type="number"
                label="Código do banco"
                placeholder="Digite o código do banco"
                error={errors?.banking_account?.bank_code?.message}
                {...register('banking_account.bank_code')}
              />
            </div>
          )}
          <div className="flex flex-col md:flex-row mt-6">
            <Button label="Criar" type="submit" />
          </div>
        </form>
      </Modal>
      <ConfirmationModal
        isOpen={isOpenInstitutionConfirmation}
        onCancel={onCloseInstitutionConfirmation}
        onContinue={() => handleOnChangeStatus(institutionIdToChange || '', institutionStatusToChange || false)}
        loading={isPendingUpdateInstitution}
      />
      <DashboardWrapper title={STRINGS.title} breadcrumbs={[{ title: STRINGS.title }]}>
        <main className="flex flex-col gap-8">
          {/* <section className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            <Stats
              title={STRINGS.header_institutions}
              value={17}
              type="number"
            />
          </section> */}
          {registeredWithSuccess && <Alert title={STRINGS.registered_success} type="success" />}
          <section>
            <RegisterListTable
              // onClickCreate={onOpen}
              loading={isFetching}
              headers={[STRINGS.table_header_name_text, STRINGS.table_header_status_text]}
            >
              {data?.data.map((institution) => (
                <RegisterListTableRow key={institution.id}>
                  <RegisterListTableCol>{institution.name}</RegisterListTableCol>
                  <RegisterListTableCol>
                    <Switch
                      label={STRINGS.input_active_label}
                      defaultValue={institution.active_on_website}
                      checked={institution.active_on_website}
                      onChange={(event) => {
                        setInstitutionIdToChange(institution.id)
                        setInstitutionStatusToChange(event.target.checked)
                        onOpenInstitutionConfirmation()
                      }}
                    />
                  </RegisterListTableCol>
                  <RegisterListTableCol>
                    <div className="w-full inline-flex justify-end gap-2">
                      {/* <Button
                          label={STRINGS.button_edit_label}
                          colorScheme="gray"
                          variant="outline"
                          size="sm"
                        /> */}
                      {/* <Button
                          label={STRINGS.button_remove_label}
                          colorScheme="red"
                          variant="outline"
                          size="sm"
                          icon={TrashIcon}
                        /> */}
                    </div>
                  </RegisterListTableCol>
                </RegisterListTableRow>
              ))}
            </RegisterListTable>
          </section>
        </main>
      </DashboardWrapper>
    </>
  )
}
