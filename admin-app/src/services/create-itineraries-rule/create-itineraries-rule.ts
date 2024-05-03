import type {
  CreateItinerariesRulesRequest,
  CreateItinerariesRulesResponse,
} from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const createItinerariesRule = (
  accessToken: string,
  itineraryId: string,
  payload: CreateItinerariesRulesRequest
): Promise<CreateItinerariesRulesResponse> => request(
  `${variables.API_BASE_URL}admin/itinerary/${itineraryId}/rule`,
  {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  }
)
