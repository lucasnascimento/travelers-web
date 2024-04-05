import type {
  CreateInstitutionsRequest,
  CreateInstitutionsResponse,
} from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const createInstitutions = (
  accessToken: string,
  payload: CreateInstitutionsRequest
): Promise<CreateInstitutionsResponse> => request(
  `${variables.API_BASE_URL}admin/institution`,
  {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  }
)
