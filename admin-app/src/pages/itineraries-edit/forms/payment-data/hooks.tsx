import * as ReactQuery from '@tanstack/react-query'
import { z as zod } from 'zod'

import { listItinerariesRules, updateItinerariesRule } from '../../../../services'
import { LocalStorage } from '../../../../utils/local-storage'
import { useForm as useBaseForm } from '../../../../hooks'
import { formTexts } from '../../../../constants'

const LIST_ITINERARIES_RULES_QUERY = 'use_list_itineraries_rules'
export const useListItinerariesRules = (id: string) => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultQuery = ReactQuery.useQuery({
    queryFn: () => listItinerariesRules(accessToken, id),
    queryKey: [LIST_ITINERARIES_RULES_QUERY],
  })

  return resultQuery
}

export const useFormItineraryRules = () => {
  const schema = zod.object({
    rules: zod
      .array(
        zod.object({
          installments: zod.union([zod.string(), zod.number()]),
          pix_discount: zod.string(),
          purchase_deadline: zod.union([zod.string(), zod.date()]),
          seat_price: zod.string(),
        })
      )
      .refine((value) => value.length > 0, {
        message: formTexts.required,
      }),
  })

  type FormValues = (typeof schema)['_output']

  const validation = useBaseForm<FormValues>(schema)

  return validation
}

const UPDATE_ITINERARIES_RULE_QUERY = 'use_update_itineraries_rule'
export const useUpdateItinerariesRule = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: { itineraryId: string; ruleId: string; payload: any }) =>
      updateItinerariesRule(accessToken, data.itineraryId, data.ruleId, data.payload),
    mutationKey: [UPDATE_ITINERARIES_RULE_QUERY],
  })

  return resultMutation
}
