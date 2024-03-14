import type { GetInstitutionsResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const getInstitutions = (): Promise<GetInstitutionsResponse> => request(`${variables.API_BASE_URL}api/public/institutions`)
