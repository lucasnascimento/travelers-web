import type {
  CreateItinerariesRulesResponse,
  UploadItinerariesDocumentsRequest,
} from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const uploadItinerariesDocuments = (
  accessToken: string,
  itineraryId: string,
  documentId: string,
  payload: UploadItinerariesDocumentsRequest
// eslint-disable-next-line max-params
): Promise<CreateItinerariesRulesResponse> => request(
  `${variables.API_BASE_URL}admin/itinerary/${itineraryId}/document/${documentId}/upload`,
  {
    body: payload,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  }
)
