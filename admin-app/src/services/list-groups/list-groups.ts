import type { ListGroupsResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const listGroups = (
  accessToken: string
): Promise<ListGroupsResponse> => request(`${variables.API_BASE_URL}admin/group`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
