import * as ReactQuery from '@tanstack/react-query'
import { z as zod } from 'zod'
import striptags from 'striptags'

import { createItineraries, createItinerariesRule, listGroups } from '../../services'
import { LocalStorage } from '../../utils/local-storage'
import { useForm as useBaseForm } from '../../hooks'
import { formTexts } from '../../constants'

const LIST_GROUPS_QUERY = 'use_list_groups'

export const useListGroups = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultQuery = ReactQuery.useQuery({
    queryFn: () => listGroups(accessToken),
    queryKey: [LIST_GROUPS_QUERY],
  })

  return resultQuery
}

export const useForm = () => {
  const schema = zod.object({
    boarding_date: zod
      .union([
        zod.string({
          required_error: formTexts.required,
        }),
        zod.date({
          required_error: formTexts.required,
        }),
      ]),
    cancelation_rules: zod
      .string({
        required_error: formTexts.required,
      })
      .refine((data) => {
        const strippedString = striptags(data)
        return strippedString.trim().length > 0
      }, { message: formTexts.required }),
    details: zod
      .string({
        required_error: formTexts.required,
      })
      .refine((data) => {
        const strippedString = striptags(data)
        return strippedString.trim().length > 0
      }, { message: formTexts.required }),
    group_id: zod
      .string({
        required_error: formTexts.required,
      })
      .min(2, { message: formTexts.required }),
    landing_date: zod
      .union([
        zod.string({
          required_error: formTexts.required,
        }),
        zod.date({
          required_error: formTexts.required,
        }),
      ]),
    rules: zod
      .array(
        zod.object({
          installments: zod.union([zod.string(), zod.number()]).optional(),
          pix_discount: zod.string().optional(),
          purchase_deadline: zod.union([zod.string(), zod.date()]).optional(),
          seat_price: zod.string().optional(),
        })
      )
      .superRefine((elements, ctx) => {
        const rules = elements

        if (!rules[0].installments) {
          ctx.addIssue({
            code: 'custom',
            message: formTexts.required,
            path: [0, 'installments'],
          })
        }

        if (!rules[0].pix_discount) {
          ctx.addIssue({
            code: 'custom',
            message: formTexts.required,
            path: [0, 'pix_discount'],
          })
        }

        if (!rules[0].purchase_deadline) {
          ctx.addIssue({
            code: 'custom',
            message: formTexts.required,
            path: [0, 'purchase_deadline'],
          })
        }

        if (!rules[0].seat_price) {
          ctx.addIssue({
            code: 'custom',
            message: formTexts.required,
            path: [0, 'seat_price'],
          })
        }
      }),
    seats: zod
      .union([
        zod
          .string({
            required_error: formTexts.required,
          })
          .min(1, { message: formTexts.required }),
        zod
          .number({
            required_error: formTexts.required,
          })
          .min(1, { message: formTexts.required }),
      ]),
    services: zod
      .string({
        required_error: formTexts.required,
      })
      .refine((data) => {
        const strippedString = striptags(data)
        return strippedString.trim().length > 0
      }, { message: formTexts.required }),
    summary: zod
      .string({
        required_error: formTexts.required,
      })
      .refine((data) => {
        const strippedString = striptags(data)
        return strippedString.trim().length > 0
      }, { message: formTexts.required }),
    terms_and_conditions: zod
      .string({
        required_error: formTexts.required,
      })
      .refine((data) => {
        const strippedString = striptags(data)
        return strippedString.trim().length > 0
      }, { message: formTexts.required }),
    title: zod
      .string({
        required_error: formTexts.required,
      })
      .min(2, { message: formTexts.required }),
  })

  type FormValues = (typeof schema)['_output']

  const validation = useBaseForm<FormValues>(schema)

  return validation
}

const CREATE_ITINERARIES_QUERY = 'use_create_itineraries'

export const useCreateItineraries = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      payload: any
    }) => (
      createItineraries(accessToken, data.payload)
    ),
    mutationKey: [CREATE_ITINERARIES_QUERY],
  })

  return resultMutation
}

const CREATE_ITINERARIES_RULE_QUERY = 'use_create_itineraries_rule'

export const useCreateItinerariesRule = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      itineraryId: string,
      payload: any
    }) => (
      createItinerariesRule(
        accessToken,
        data.itineraryId,
        data.payload
      )
    ),
    mutationKey: [CREATE_ITINERARIES_RULE_QUERY],
  })

  return resultMutation
}
