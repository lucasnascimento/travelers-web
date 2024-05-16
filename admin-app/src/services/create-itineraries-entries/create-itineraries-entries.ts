import type {
  CreateItinerariesEntriesRequest,
  CreateItinerariesEntriesResponse,
} from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const createItinerariesEntries = (
  accessToken: string,
  itineraryId: string,
  payload: CreateItinerariesEntriesRequest
): Promise<CreateItinerariesEntriesResponse> => request(
  `${variables.API_BASE_URL}admin/itinerary/${itineraryId}/entry`,
  {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  }
)
