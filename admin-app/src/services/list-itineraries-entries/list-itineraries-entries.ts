import type { ListItineraryEntryResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const listItinerariesEntries = (
  accessToken: string,
  id: string
): Promise<ListItineraryEntryResponse> => request(
  `${variables.API_BASE_URL}admin/itinerary/${id}/entry`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
)
