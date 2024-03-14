import { z as zod } from 'zod'

import { useForm as useBaseForm } from '../../../../hooks'
import { formTexts } from '../../../../constants'

const validateCPF = (rawCpf: string): boolean => {
  const cpf = rawCpf.replace(/\D/g, '')

  if (cpf.length !== 11) {
    return false
  }
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false
  }

  let sum = 0
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (10 - i)
  }

  let remainder = 11 - (sum % 11)
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }
  if (remainder !== parseInt(cpf.charAt(9), 10)) {
    return false
  }

  sum = 0
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (11 - i)
  }
  remainder = 11 - (sum % 11)
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }
  if (remainder !== parseInt(cpf.charAt(10), 10)) {
    return false
  }

  return true
}

export const useForm = (defaultValues?: any) => {
  const schema = zod.object({
    payer_document: zod
      .string({
        required_error: formTexts.required,
      })
      .min(9, { message: formTexts.required })
      .refine((cpf) => validateCPF(cpf), {
        message: formTexts.cpf,
      }),
    payer_email: zod
      .string({
        required_error: formTexts.required,
      })
      .email({ message: formTexts.email })
      .min(6, { message: formTexts.minLength(6) }),
    payer_name: zod
      .string({
        required_error: formTexts.required,
      })
      .min(6, { message: formTexts.minLength(6) }),
    payer_phone: zod
      .string({
        required_error: formTexts.required,
      })
      .min(11, { message: formTexts.required })
      .max(15, { message: formTexts.maxLength(15) }),
    travelers: zod.array(
      zod.object({
        traveler_birthdate: zod
          .string({
            required_error: formTexts.required,
          })
          .min(10, { message: formTexts.required })
          .max(10, { message: formTexts.maxLength(10) }),
        traveler_document_type: zod
          .enum(['rg', 'rne', ''])
          .refine((value) => {
            const validation = value !== undefined && value !== ''

            return validation
          }, {
            message: 'Campo obrigatório',
          }),
        traveler_extras: zod.object({
          'document-date': zod
            .string({
              required_error: formTexts.required,
            })
            .refine(
              (issuer) => {
                if (!issuer) {
                  return true
                }

                return issuer.length > 9 && issuer.length < 11
              },
              {
                message: formTexts.invalid,
              }
            ),
          'document-issuer': zod
            .string({
              required_error: formTexts.required,
            })
            .refine(
              (issuer) => {
                if (!issuer) {
                  return true
                }

                return issuer.length > 2 && issuer.length < 20
              },
              {
                message: formTexts.invalid,
              }
            ),
          'document-number-cpf': zod
            .string()
            .min(9, { message: formTexts.required })
            .refine(
              (cpf) => {
                if (!cpf) {
                  return true
                }

                return validateCPF(cpf)
              },
              {
                message: formTexts.cpf,
              }
            ),
          'document-number-rg': zod
            .string()
            .optional(),
          'document-number-rne': zod
            .string()
            .refine(
              (rne) => {
                if (!rne) {
                  return true
                }

                return rne.length >= 20
              },
              {
                message: formTexts.required,
              }
            )
            .optional(),
          'room-grade': zod
            .string({
              required_error: formTexts.required,
            })
            .min(2, { message: formTexts.minLength(2) }),
        }),
        traveler_gender: zod
          .enum(['Male', 'Female', 'Other', ''])
          .refine((value) => {
            const validation = value !== undefined && value !== ''

            return validation
          }, {
            message: 'Campo obrigatório',
          }),
        traveler_name: zod
          .string({
            required_error: formTexts.required,
          })
          .min(6, { message: formTexts.minLength(6) }),
      })
    ),
  })
    .superRefine((elements, ctx) => {
      const { travelers } = elements

      const checkDocumentRequired = () => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < travelers.length; i++) {
          const traveler = travelers[i]
          const documentType = traveler.traveler_document_type
          const documentTypeName = `document-number-${documentType}`
          const documentNumber = traveler.traveler_extras[documentTypeName as 'document-number-rg' | 'document-number-rne']

          if (documentNumber === undefined || documentNumber === '') {
            ctx.addIssue({
              code: 'custom',
              message: formTexts.required,
              path: ['travelers', i, 'traveler_extras', documentTypeName],
            })
          }
        }
      }
      const checkRgFieldsRequired = () => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < travelers.length; i++) {
          const traveler = travelers[i]
          const documentType = traveler.traveler_document_type
          const documentDate = traveler.traveler_extras['document-date']
          const documentIssuer = traveler.traveler_extras['document-issuer']

          if (documentType === 'rg') {
            if (documentDate === undefined || documentDate === '') {
              ctx.addIssue({
                code: 'custom',
                message: formTexts.required,
                path: ['travelers', i, 'traveler_extras', 'document-date'],
              })
            }

            if (documentIssuer === undefined || documentIssuer === '') {
              ctx.addIssue({
                code: 'custom',
                message: formTexts.required,
                path: ['travelers', i, 'traveler_extras', 'document-issuer'],
              })
            }
          }
        }
      }

      checkDocumentRequired()
      checkRgFieldsRequired()
    })
    .superRefine((elements, ctx) => {
      const { payer_document: payerDocument, travelers } = elements

      const isCpfEqual = travelers.some((traveler) => traveler.traveler_extras['document-number-cpf'] === payerDocument)

      if (isCpfEqual) {
        ctx.addIssue({
          code: 'custom',
          message: 'O CPF do responsável não pode ser igual ao de um dos passageiros',
          path: ['payer_document'],
        })
      }
    })

  type FormValues = zod.infer<typeof schema>
  const validation = useBaseForm<FormValues>(schema, defaultValues)

  return validation
}
