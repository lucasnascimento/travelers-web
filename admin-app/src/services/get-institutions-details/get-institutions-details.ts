import type { GetInstitutionsDetailsResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const getInstitutionsDetails = (
  institutionId: string,
  password: string
): Promise<GetInstitutionsDetailsResponse> => request(`${variables.API_BASE_URL}api/public/institutions/${institutionId}`, {
  headers: {
    'x-password': password,
  },
})
