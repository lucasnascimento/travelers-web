import type {
  CreateItinerariesDocumentsRequest,
  CreateItinerariesDocumentsResponse,
} from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const createItinerariesDocuments = (
  accessToken: string,
  itineraryId: string,
  payload: CreateItinerariesDocumentsRequest
): Promise<CreateItinerariesDocumentsResponse> => request(
  `${variables.API_BASE_URL}admin/itinerary/${itineraryId}/document`,
  {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  }
)
