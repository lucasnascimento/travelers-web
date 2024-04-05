import type { ListInstitutionsResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const listInstitutions = (
  accessToken: string
): Promise<ListInstitutionsResponse> => request(`${variables.API_BASE_URL}admin/institution`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
