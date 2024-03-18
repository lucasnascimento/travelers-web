import * as ReactQuery from '@tanstack/react-query'
import { z as zod } from 'zod'

import {
  createInstitutions,
  listInstitutions,
  updateInstitutions,
} from '../../services'
import { removeSpecialCharacters, validateCNPJ } from '../../utils'
import { LocalStorage } from '../../utils/local-storage'
import { useForm as useBaseForm } from '../../hooks'
import { formTexts } from '../../constants'

const LIST_INSTITUTIONS_QUERY = 'use_list_institutions'

export const useListInstitutions = () => {
  const loginData = LocalStorage.loadLogin()
  const accessToken = loginData.access_token

  const resultQuery = ReactQuery.useQuery({
    queryFn: () => listInstitutions(accessToken),
    queryKey: [LIST_INSTITUTIONS_QUERY],
  })

  return resultQuery
}

export const useForm = () => {
  const schema = zod.object({
    banking_account: zod.object({
      account_number: zod
        .string()
        .min(6, { message: formTexts.minLength(6) })
        .max(6, { message: formTexts.maxLength(6) })
        .optional(),
      bank_agency: zod
        .string()
        .min(4, { message: formTexts.minLength(4) })
        .max(4, { message: formTexts.maxLength(4) })
        .optional(),
      bank_code: zod
        .string()
        .min(3, { message: formTexts.minLength(3) })
        .max(4, { message: formTexts.maxLength(4) })
        .optional(),
    }).optional(),
    cnpj: zod
      .string({
        required_error: formTexts.required,
      })
      .refine((cnpj) => validateCNPJ(cnpj), {
        message: formTexts.cnpj,
      }),
    has_banking_account: zod
      .boolean(),
    name: zod
      .string({
        required_error: formTexts.required,
      })
      .min(6, { message: formTexts.required }),
    password: zod
      .string({
        required_error: formTexts.required,
      })
      .min(6, { message: formTexts.required }),
  })
    .superRefine((elements, ctx) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { banking_account, has_banking_account } = elements

      if (has_banking_account && !banking_account?.bank_agency) {
        ctx.addIssue({
          code: 'custom',
          message: formTexts.required,
          path: ['banking_account.bank_agency'],
        })
      }

      if (has_banking_account && !banking_account?.bank_code) {
        ctx.addIssue({
          code: 'custom',
          message: formTexts.required,
          path: ['banking_account.bank_code'],
        })
      }

      if (has_banking_account && removeSpecialCharacters(banking_account?.account_number || '').length === 0) {
        ctx.addIssue({
          code: 'custom',
          message: formTexts.required,
          path: ['banking_account.account_number'],
        })
      }
    })

  type FormValues = typeof schema['_output']

  const validation = useBaseForm<FormValues>(
    schema
  )

  return validation
}

const CREATE_INSTITUTIONS_QUERY = 'use_create_institutions'

export const useCreateInstitution = () => {
  const loginData = LocalStorage.loadLogin()
  const accessToken = loginData.access_token

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (payload: any) => (
      createInstitutions(accessToken, payload)
    ),
    mutationKey: [CREATE_INSTITUTIONS_QUERY],
  })

  return resultMutation
}

const UPDATE_INSTITUTIONS_QUERY = 'use_update_institutions'

export const useUpdateInstitution = () => {
  const loginData = LocalStorage.loadLogin()
  const accessToken = loginData.access_token

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      id: string,
      payload: any
    }) => (
      updateInstitutions(accessToken, data.id, data.payload)
    ),
    mutationKey: [UPDATE_INSTITUTIONS_QUERY],
  })

  return resultMutation
}
