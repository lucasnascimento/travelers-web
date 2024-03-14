import { z as zod } from 'zod'
import * as ReactQuery from '@tanstack/react-query'

import { useForm as useBaseForm } from '../../hooks'
import { formTexts } from '../../constants'
import { bookingItineraries } from '../../services'

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

export const useForm = () => {
  const schema = zod.object({
    payer_document: zod
      .string({
        required_error: formTexts.required,
      })
      .min(6, { message: formTexts.required })
      .refine((cpf) => validateCPF(cpf), {
        message: formTexts.cpf,
      }),
    payer_email: zod
      .string({
        required_error: formTexts.required,
      })
      .email({ message: formTexts.email })
      .min(6, { message: formTexts.required }),
    payer_name: zod
      .string({
        required_error: formTexts.required,
      })
      .min(6, { message: formTexts.required }),
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
        traveler_extras: zod.object({
          'document-date': zod
            .string({
              required_error: formTexts.required,
            })
            .min(10, { message: formTexts.required })
            .max(10, { message: formTexts.maxLength(10) }),
          'document-issuer': zod
            .string({
              required_error: formTexts.required,
            })
            .min(2, { message: formTexts.required })
            .max(20, { message: formTexts.maxLength(20) }),
          'document-number': zod
            .string({
              required_error: formTexts.required,
            })
            .min(12, { message: formTexts.required })
            .max(12, { message: formTexts.maxLength(12) }),
          'room-grade': zod
            .string({
              required_error: formTexts.required,
            })
            .min(2, { message: formTexts.required }),
        }),
        traveler_gender: zod
          .enum(['Male', 'Female', ''])
          .refine((value) => value !== undefined && value !== '', {
            message: 'Campo obrigatório',
          }),
        traveler_name: zod
          .string({
            required_error: formTexts.required,
          })
          .min(6, { message: formTexts.required }),
      })
    ),
  })

  type FormValues = zod.infer<typeof schema>
  const validation = useBaseForm<FormValues>(schema)

  return validation
}

const BOOKING_ITINERARIES_QUERY = 'booking_itineraries_query'

export const useBookingItineraries = () => {
  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      resourceId: string,
      password: string,
      payload: any
    }) => (
      bookingItineraries(data.resourceId, data.password, data.payload)
    ),
    mutationKey: [BOOKING_ITINERARIES_QUERY],
  })

  return resultMutation
}
