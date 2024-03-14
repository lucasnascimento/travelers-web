import type { GetItinerariesDetailsResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const getItinerariesDetails = (
  itinerarieId: string,
  password: string
): Promise<GetItinerariesDetailsResponse> => request(`${variables.API_BASE_URL}api/public/itineraries/${itinerarieId}`, {
  headers: {
    'x-password': password,
  },
})
