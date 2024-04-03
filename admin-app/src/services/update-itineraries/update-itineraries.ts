import type {
  UpdateItinerariesRequest,
  UpdateItinerariesResponse,
} from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const updateItineraries = (
  accessToken: string,
  id: string,
  payload: UpdateItinerariesRequest
): Promise<UpdateItinerariesResponse> => request(
  `${variables.API_BASE_URL}admin/itinerary/${id}`,
  {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'PUT',
  }
)
