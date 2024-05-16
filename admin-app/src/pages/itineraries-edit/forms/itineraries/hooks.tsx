import * as ReactQuery from '@tanstack/react-query'
import { z as zod } from 'zod'

import {
  createItinerariesEntries,
  listItinerariesEntries,
  removeItinerariesEntries,
  updateItinerariesEntries,
} from '../../../../services'
import { LocalStorage } from '../../../../utils/local-storage'
import { useForm as useBaseForm } from '../../../../hooks'
import { formTexts } from '../../../../constants'

export const useFormItineraryEntries = () => {
  const schema = zod.object({
    position: zod
      .string({
        required_error: formTexts.required,
      })
      .min(1, { message: formTexts.required }),
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
    mutationFn: (data: { itineraryId: string; payload: any }) =>
      createItinerariesEntries(accessToken, data.itineraryId, data.payload),
    mutationKey: [CREATE_ITINERARIES_ENTRIES_QUERY],
  })

  return resultMutation
}

const UPDATE_ITINERARIES_ENTRIES_QUERY = 'use_update_itineraries_entries'
export const useUpdateItinerariesEntries = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: { itineraryId: string; entryId: string; payload: any }) =>
      updateItinerariesEntries(accessToken, data.itineraryId, data.entryId, data.payload),
    mutationKey: [UPDATE_ITINERARIES_ENTRIES_QUERY],
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
    mutationFn: (data: { itineraryId: string; entryId: string }) =>
      removeItinerariesEntries(accessToken, data.itineraryId, data.entryId),
    mutationKey: [REMOVE_ITINERARIES_ENTRIES_QUERY],
  })

  return resultMutation
}
