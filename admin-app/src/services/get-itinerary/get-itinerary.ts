import type { GetItineraryResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const getItinerary = (
  accessToken: string,
  id: string
): Promise<GetItineraryResponse> => request(`${variables.API_BASE_URL}admin/itinerary/${id}`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
