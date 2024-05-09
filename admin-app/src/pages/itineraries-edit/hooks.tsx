import * as ReactQuery from '@tanstack/react-query'
import { z as zod } from 'zod'
import striptags from 'striptags'

import {
  createItinerariesDocuments,
  createItinerariesEntries,
  getItinerary,
  listGroups,
  listItinerariesDocuments,
  listItinerariesEntries,
  listItinerariesRules,
  removeItinerariesDocuments,
  removeItinerariesEntries,
  updateItineraries,
  updateItinerariesRule,
  uploadItinerariesDocuments,
} from '../../services'
import { LocalStorage } from '../../utils/local-storage'
import { useForm as useBaseForm } from '../../hooks'
import { formTexts } from '../../constants'

export const useFormItinerary = () => {
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

export const useFormItineraryRules = () => {
  const schema = zod.object({
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
  })

  type FormValues = (typeof schema)['_output']

  const validation = useBaseForm<FormValues>(schema)

  return validation
}

export const useFormItineraryDocuments = () => {
  const schema = zod.object({
    description: zod
      .string()
      .optional(),
    file: zod.any(),
    link: zod
      .string()
      .optional(),
    title: zod
      .string({
        required_error: formTexts.required,
      })
      .min(2, { message: formTexts.required }),
  })
    .superRefine((elements, ctx) => {
      const { file, link } = elements

      if (file.length === 0 && !link) {
        ctx.addIssue({
          code: 'custom',
          message: formTexts.oneInputRequired,
          path: ['file'],
        })

        ctx.addIssue({
          code: 'custom',
          message: formTexts.oneInputRequired,
          path: ['link'],
        })
      }
    })

  type FormValues = (typeof schema)['_output']

  const validation = useBaseForm<FormValues>(schema)

  return validation
}

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

const LIST_ITINERARIES_DOCUMENTS_QUERY = 'use_list_itineraries_documents'
export const useListItinerariesDocuments = (id: string) => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultQuery = ReactQuery.useQuery({
    queryFn: () => listItinerariesDocuments(accessToken, id),
    queryKey: [LIST_ITINERARIES_DOCUMENTS_QUERY],
  })

  return resultQuery
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

const REMOVE_ITINERARIES_DOCUMENTS_QUERY = 'use_remove_itineraries_documents'
export const useRemoveItinerariesRule = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      itineraryId: string,
      documentId: string,
    }) => (
      removeItinerariesDocuments(
        accessToken,
        data.itineraryId,
        data.documentId
      )
    ),
    mutationKey: [REMOVE_ITINERARIES_DOCUMENTS_QUERY],
  })

  return resultMutation
}

const CREATE_ITINERARIES_DOCUMENTS_QUERY = 'use_create_itineraries_documents'
export const useCreateItinerariesDocuments = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      itineraryId: string,
      payload: any
    }) => (
      createItinerariesDocuments(
        accessToken,
        data.itineraryId,
        data.payload
      )
    ),
    mutationKey: [CREATE_ITINERARIES_DOCUMENTS_QUERY],
  })

  return resultMutation
}

const UPLOAD_ITINERARIES_DOCUMENTS_QUERY = 'use_upload_itineraries_documents'
export const useUploadItinerariesDocuments = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      itineraryId: string,
      documentId: string,
      payload: any
    }) => (
      uploadItinerariesDocuments(
        accessToken,
        data.itineraryId,
        data.documentId,
        data.payload
      )
    ),
    mutationKey: [UPLOAD_ITINERARIES_DOCUMENTS_QUERY],
  })

  return resultMutation
}

const LIST_ITINERARIES_ENTRIES_QUERY = 'use_remove_itineraries_entries'
export const useListItinerariesEntries = (id: string) => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultQuery = ReactQuery.useQuery({
    queryFn: () => listItinerariesEntries(accessToken, id),
    queryKey: [LIST_ITINERARIES_ENTRIES_QUERY],
  })

  return resultQuery
}

const REMOVE_ITINERARIES_ENTRIES_QUERY = 'use_remove_itineraries_entries'
export const useRemoveItinerariesEntry = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      itineraryId: string,
      entryId: string,
    }) => (
      removeItinerariesEntries(
        accessToken,
        data.itineraryId,
        data.entryId
      )
    ),
    mutationKey: [REMOVE_ITINERARIES_ENTRIES_QUERY],
  })

  return resultMutation
}

export const useFormItineraryEntries = () => {
  const schema = zod.object({
    description: zod
      .string({
        required_error: formTexts.required,
      })
      .min(2, { message: formTexts.required }),
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

const CREATE_ITINERARIES_ENTRIES_QUERY = 'use_create_itineraries_entries'
export const useCreateItinerariesEntries = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      itineraryId: string,
      payload: any
    }) => (
      createItinerariesEntries(
        accessToken,
        data.itineraryId,
        data.payload
      )
    ),
    mutationKey: [CREATE_ITINERARIES_ENTRIES_QUERY],
  })

  return resultMutation
}
