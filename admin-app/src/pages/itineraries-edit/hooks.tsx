import * as ReactQuery from '@tanstack/react-query'
import { z as zod } from 'zod'
import striptags from 'striptags'

import {
  getItinerary, listGroups, listItinerariesRules, updateItineraries, updateItinerariesRule,
} from '../../services'
import { LocalStorage } from '../../utils/local-storage'
import { useForm as useBaseForm } from '../../hooks'
import { formTexts } from '../../constants'

const GET_ITINERARY_QUERY = 'use_get_itinerary'

export const useGetItinerary = (id: string) => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultQuery = ReactQuery.useQuery({
    queryFn: () => getItinerary(accessToken, id),
    queryKey: [GET_ITINERARY_QUERY],
  })

  return resultQuery
}

const LIST_ITINERARIES_RULES_QUERY = 'use_list_itineraries_rules'

export const useListItinerariesRules = (id: string) => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultQuery = ReactQuery.useQuery({
    queryFn: () => listItinerariesRules(accessToken, id),
    queryKey: [LIST_ITINERARIES_RULES_QUERY],
  })

  return resultQuery
}

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
    boarding_date: zod.union([zod.string(), zod.date()]),
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
      }),
    landing_date: zod.union([zod.string(), zod.date()]),
    rules: zod.array(
      zod.object({
        installments: zod.union([zod.string(), zod.number()]),
        pix_discount: zod.string(),
        purchase_deadline: zod.union([zod.string(), zod.date()]),
        seat_price: zod.string(),
      })
    ).refine((value) => value.length > 0, {
      message: formTexts.required,
    }),
    seats: zod.union([zod.string(), zod.number()]),
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

const UPDATE_ITINERARIES_QUERY = 'use_update_itineraries'

export const useUpdateItineraries = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      id: string,
      payload: any
    }) => (
      updateItineraries(accessToken, data.id, data.payload)
    ),
    mutationKey: [UPDATE_ITINERARIES_QUERY],
  })

  return resultMutation
}

const UPDATE_ITINERARIES_RULE_QUERY = 'use_update_itineraries_rule'

export const useUpdateItinerariesRule = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      itineraryId: string,
      ruleId: string,
      payload: any
    }) => (
      updateItinerariesRule(
        accessToken,
        data.itineraryId,
        data.ruleId,
        data.payload
      )
    ),
    mutationKey: [UPDATE_ITINERARIES_RULE_QUERY],
  })

  return resultMutation
}
