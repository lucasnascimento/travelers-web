import * as React from 'react'
import { useFieldArray } from 'react-hook-form'

import { Button, Input, Select } from '../../../../components'
import { useOnMount } from '../../../../hooks'
import { FormData } from '../../types'

import { useForm } from './hooks'

const formatFormData = (rawInputData: FormData) => {
  const inputData = { ...rawInputData }

  inputData.payer_document = inputData.payer_document.replace(/[^\d]/g, '')
  inputData.payer_phone = inputData.payer_phone.replace(/[^\d]/g, '')

  inputData.travelers.forEach((traveler) => {
    const documentType = traveler.traveler_document_type

    // eslint-disable-next-line no-param-reassign
    traveler.traveler_extras['document-number-cpf'] = traveler.traveler_extras['document-number-cpf']?.replace(/[^\d]/g, '')

    if (documentType === 'rg') {
      // eslint-disable-next-line no-param-reassign
      traveler.traveler_extras['document-number-rg'] = traveler.traveler_extras['document-number-rg']?.replace(/[^\d]/g, '')
      // eslint-disable-next-line no-param-reassign
      traveler.traveler_extras['document-number'] = traveler.traveler_extras['document-number-rg']
    }

    if (documentType === 'rne') {
      // eslint-disable-next-line no-param-reassign
      traveler.traveler_extras['document-number-rne'] = traveler.traveler_extras['document-number-rne']?.replace(/[^\d]/g, '')
      // eslint-disable-next-line no-param-reassign
      traveler.traveler_extras['document-number'] = traveler.traveler_extras['document-number-rne']
    }
  })

  return inputData
}

type Props = {
  formData?: FormData
  onSubmit: (formData: any) => void
}

export const FillForm = ({ formData, onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    resetField,
    watch,
  } = useForm(formData)
  const travelers = watch('travelers')

  React.useEffect(() => {
    if (travelers) {
      for (let i = 0; i < travelers.length; i += 1) {
        const traveler = travelers[i]
        const documentType = traveler?.traveler_document_type

        if (documentType === 'rg') {
          if (traveler.traveler_extras['document-number-rne']) {
            resetField(`travelers.${i}.traveler_extras.document-number-rne`)
          }
        }

        if (documentType === 'rne') {
          if (traveler.traveler_extras['document-number-rg']) {
            resetField(`travelers.${i}.traveler_extras.document-number-rg`)
          }
          if (traveler.traveler_extras['document-date']) {
            resetField(`travelers.${i}.traveler_extras.document-date`)
          }
          if (traveler.traveler_extras['document-issuer']) {
            resetField(`travelers.${i}.traveler_extras.document-issuer`)
          }
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(travelers)])

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'travelers',
  })

  const handleOnClickAppend = () => {
    append({
      traveler_birthdate: '',
      traveler_document_type: '',
      traveler_extras: {
        'document-date': '',
        'document-issuer': '',
        'document-number-cpf': '',
        'room-grade': '',
      },
      traveler_gender: '',
      traveler_name: '',
    })
  }

  const handleOnSubmit = async (rawFormData: any) => {
    const formatedData: FormData = formatFormData(rawFormData)

    onSubmit(formatedData)
  }

  useOnMount(() => {
    if (formData && formData.payer_name) {
      return
    }

    append({
      traveler_birthdate: '',
      traveler_document_type: '',
      traveler_extras: {
        'document-date': '',
        'document-issuer': '',
        'document-number-cpf': '',
        'room-grade': '',
      },
      traveler_gender: '',
      traveler_name: '',
    })
  })

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="flex flex-col gap-16">
        <section className="flex flex-col gap-3">
          <h2 className="text-3xl font-semibold mb-4">
            Dados do responsável
          </h2>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Input
              className="flex-1"
              id="payer_name"
              type="text"
              label="Nome completo"
              placeholder="Digite o nome"
              error={errors.payer_name?.message}
              {...register('payer_name')}
            />
            <Input
              className="flex-1"
              id="payer_document"
              type="text"
              label="CPF"
              placeholder="Digite o CPF"
              mask="999.999.999-99"
              maskPlaceholder=""
              alwaysShowMask={false}
              error={errors.payer_document?.message}
              {...register('payer_document')}
            />
            <Input
              className="flex-1"
              id="payer_email"
              type="text"
              label="E-mail"
              placeholder="Digite o e-mail"
              error={errors.payer_email?.message}
              {...register('payer_email')}
            />
            <Input
              className="flex-1"
              id="payer_phone"
              type="text"
              label="Telefone"
              placeholder="Digite o telefone"
              mask="(99)99999-9999"
              maskPlaceholder=""
              alwaysShowMask={false}
              error={errors.payer_phone?.message}
              {...register('payer_phone')}
            />
          </div>
        </section>
        <section className="flex flex-col gap-3">
          <div className="flex flex-row gap-4 items-center mb-4">
            <h2 className="text-3xl font-semibold">
              Dados do viajante
            </h2>
            <Button
              label="Adicionar viajante"
              variant="outline"
              onClick={handleOnClickAppend}
            />
          </div>
          {fields.map((traveler, index) => (
            <div key={traveler.id} className="flex flex-col gap-3 mb-10">
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <Input
                  className="flex-1"
                  id="traveler_name"
                  type="text"
                  label="Nome completo"
                  placeholder="Digite o nome"
                  error={errors.travelers?.[index]?.traveler_name?.message}
                  {...register(`travelers.${index}.traveler_name`)}
                />
                <Input
                  className="flex-1"
                  id="traveler_birthdate"
                  type="date"
                  label="Data de nascimento"
                  placeholder="Digite a data de nascimento"
                  error={
                    errors.travelers?.[index]?.traveler_birthdate?.message
                  }
                  {...register(`travelers.${index}.traveler_birthdate`)}
                />
                <Input
                  className="flex-1"
                  id="room-grade"
                  type="text"
                  label="Unidade"
                  placeholder="Digite a unidade"
                  error={errors.travelers?.[index]?.traveler_extras?.['room-grade']?.message}
                  {...register(`travelers.${index}.traveler_extras.room-grade`)}
                />
                <Select
                  className="flex-1"
                  id="traveler_gender"
                  label="Gênero"
                  placeholder="Escolha um gênero"
                  options={[
                    { label: 'Masculino', value: 'Male' },
                    { label: 'Feminino', value: 'Female' },
                    { label: 'Outro', value: 'Other' },
                  ]}
                  error={
                    errors.travelers?.[index]?.traveler_gender?.message
                  }
                  {...register(`travelers.${index}.traveler_gender`)}
                />
              </div>
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <Input
                  className="flex-1"
                  id={`document-number-cpf-${index}`}
                  type="text"
                  label="CPF"
                  placeholder="Digite o número do CPF"
                  mask="999.999.999-99"
                  maskPlaceholder=""
                  alwaysShowMask={false}
                  error={
                    errors.travelers?.[index]?.traveler_extras?.['document-number-cpf']?.message
                  }
                  {...register(`travelers.${index}.traveler_extras.document-number-cpf`)}
                />
                <Select
                  className="flex-1"
                  id="document_type"
                  label="Tipo de documento"
                  placeholder="Escolha um documento"
                  options={[
                    { label: 'RG', value: 'rg' },
                    { label: 'RNE', value: 'rne' },
                  ]}
                  error={
                    errors.travelers?.[index]?.traveler_document_type?.message
                  }
                  {...register(`travelers.${index}.traveler_document_type`)}
                />
                {
                  travelers?.[index]?.traveler_document_type === 'rne' && (
                    <Input
                      className="flex-1"
                      id="document-number-rne"
                      type="text"
                      label="RNE"
                      placeholder="Digite o número do RNE"
                      mask="99999.999999/9999-99"
                      maskPlaceholder=""
                      alwaysShowMask={false}
                      error={
                        errors.travelers?.[index]?.traveler_extras?.['document-number-rne']?.message
                      }
                      {...register(`travelers.${index}.traveler_extras.document-number-rne`)}
                    />
                  )
                }
                {
                  travelers?.[index]?.traveler_document_type === 'rg' && (
                    <>
                      <Input
                        className="flex-1"
                        id="document-number-rg"
                        type="text"
                        label="Número do RG"
                        placeholder="Digite o número do RG"
                        mask="99.999.999-9"
                        maskPlaceholder=""
                        alwaysShowMask={false}
                        error={
                          errors.travelers?.[index]?.traveler_extras?.['document-number-rg']?.message
                        }
                        {...register(`travelers.${index}.traveler_extras.document-number-rg`)}
                      />
                      <Input
                        className="flex-1"
                        id="document-date"
                        type="date"
                        label="Data de expedição"
                        placeholder="Digite a data de expedição"
                        error={errors.travelers?.[index]?.traveler_extras?.['document-date']?.message}
                        {...register(`travelers.${index}.traveler_extras.document-date`)}
                      />
                      <Input
                        className="flex-1"
                        id="document-issuer"
                        type="text"
                        label="Órgão emissor"
                        placeholder="Digite o órgão emissor"
                        error={errors.travelers?.[index]?.traveler_extras?.['document-issuer']?.message}
                        {...register(`travelers.${index}.traveler_extras.document-issuer`)}
                      />
                    </>
                  )
                }
              </div>
              {
                index !== 0 && (
                  <div className="flex flex-row justify-start">
                    <Button
                      variant="outline"
                      colorScheme="red"
                      onClick={() => remove(index)}
                      label="Remover"
                    />
                  </div>
                )
              }
            </div>
          ))}
        </section>
      </div>
      <div className="flex flex-row justify-end">
        <Button
          type="submit"
          label="Adicionar no carrinho"
        />
      </div>
    </form>
  )
}
