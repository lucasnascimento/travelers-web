import type { GetInstitutionsItinerariesResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const getInstitutionsItineraries = (
  institutionId: string,
  password: string
): Promise<GetInstitutionsItinerariesResponse> => request(
  `${variables.API_BASE_URL}api/public/institutions/${institutionId}/itineraries`,
  {
    headers: {
      'x-password': password,
    },
  }
)
