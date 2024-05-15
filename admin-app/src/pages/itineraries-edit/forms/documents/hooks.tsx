import * as ReactQuery from '@tanstack/react-query'
import { z as zod } from 'zod'

import {
  createItinerariesDocuments,
  listItinerariesDocuments,
  removeItinerariesDocuments,
  uploadItinerariesDocuments,
} from '../../../../services'
import { LocalStorage } from '../../../../utils/local-storage'
import { useForm as useBaseForm } from '../../../../hooks'
import { formTexts } from '../../../../constants'

const LIST_ITINERARIES_DOCUMENTS_QUERY = 'use_list_itineraries_documents'
export const useListItinerariesDocuments = (id: string) => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultQuery = ReactQuery.useQuery({
    queryFn: () => listItinerariesDocuments(accessToken, id),
    queryKey: [LIST_ITINERARIES_DOCUMENTS_QUERY],
  })

  return resultQuery
}

const REMOVE_ITINERARIES_DOCUMENTS_QUERY = 'use_remove_itineraries_documents'
export const useRemoveItinerariesRule = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: { itineraryId: string; documentId: string }) =>
      removeItinerariesDocuments(accessToken, data.itineraryId, data.documentId),
    mutationKey: [REMOVE_ITINERARIES_DOCUMENTS_QUERY],
  })

  return resultMutation
}

export const useFormItineraryDocuments = () => {
  const schema = zod
    .object({
      description: zod.string().optional(),
      file: zod.any(),
      link: zod.string().optional(),
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

const CREATE_ITINERARIES_DOCUMENTS_QUERY = 'use_create_itineraries_documents'
export const useCreateItinerariesDocuments = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: { itineraryId: string; payload: any }) =>
      createItinerariesDocuments(accessToken, data.itineraryId, data.payload),
    mutationKey: [CREATE_ITINERARIES_DOCUMENTS_QUERY],
  })

  return resultMutation
}

const UPLOAD_ITINERARIES_DOCUMENTS_QUERY = 'use_upload_itineraries_documents'
export const useUploadItinerariesDocuments = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: { itineraryId: string; documentId: string; payload: any }) =>
      uploadItinerariesDocuments(accessToken, data.itineraryId, data.documentId, data.payload),
    mutationKey: [UPLOAD_ITINERARIES_DOCUMENTS_QUERY],
  })

  return resultMutation
}
