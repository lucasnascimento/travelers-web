import type { AuthenticateRequest, AuthenticateResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const authenticate = (
  payload: AuthenticateRequest
): Promise<AuthenticateResponse> => request(
  `${variables.API_BASE_URL}admin/login`,
  {
    body: JSON.stringify(payload),
    method: 'POST',
  }
)
