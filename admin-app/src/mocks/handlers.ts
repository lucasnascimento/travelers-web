import { getInstitutions } from '../services/get-institutions/get-institutions.msw'
import { getInstitutionsItineraries } from '../services/get-institutions-itineraries/get-institutions-itineraries.msw'
import { getInstitutionsDetails } from '../services/get-institutions-details/get-institutions-details.msw'
import { getItinerariesDetails } from '../services/get-itineraries-details/get-itineraries-details.msw'
import { bookingItineraries } from '../services/booking-itineraries/booking-itineraries.msw'

export const handlers = [
  getInstitutions,
  getInstitutionsItineraries,
  getInstitutionsDetails,
  getItinerariesDetails,
  bookingItineraries,
]
