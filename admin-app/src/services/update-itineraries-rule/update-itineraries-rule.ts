import type {
  UpdateItinerariesRequest,
  UpdateItinerariesResponse,
} from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const updateItinerariesRule = (
  accessToken: string,
  itineraryId: string,
  ruleId: string,
  payload: UpdateItinerariesRequest
// eslint-disable-next-line max-params
): Promise<UpdateItinerariesResponse> => request(
  `${variables.API_BASE_URL}admin/itinerary/${itineraryId}/rule/${ruleId}`,
  {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'PUT',
  }
)
