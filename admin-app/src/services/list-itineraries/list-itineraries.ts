import type { ListItinerariesResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const listItineraries = (
  accessToken: string
): Promise<ListItinerariesResponse> => request(`${variables.API_BASE_URL}admin/itinerary`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
