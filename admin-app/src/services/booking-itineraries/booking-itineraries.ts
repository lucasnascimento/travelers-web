import type {
  BookingItinerariesRequest,
  BookingItinerariesResponse,
} from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const bookingItineraries = (
  itineraryId: string,
  password: string,
  payload: BookingItinerariesRequest
): Promise<BookingItinerariesResponse> => request(
  `${variables.API_BASE_URL}api/public/booking/itineraries/${itineraryId}`,
  {
    body: JSON.stringify(payload),
    headers: {
      'x-password': password,
    },
    method: 'POST',
  }
)
