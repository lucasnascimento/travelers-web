import type {
  UpdateInstitutionsRequest,
  UpdateInstitutionsResponse,
} from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const updateInstitutions = (
  accessToken: string,
  id: string,
  payload: UpdateInstitutionsRequest
): Promise<UpdateInstitutionsResponse> => request(
  `${variables.API_BASE_URL}admin/institution/${id}`,
  {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'PUT',
  }
)
