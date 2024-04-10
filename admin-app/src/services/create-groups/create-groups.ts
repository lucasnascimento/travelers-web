import type {
  CreateGroupsRequest,
  CreateGroupsResponse,
} from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const createGroups = (
  accessToken: string,
  payload: CreateGroupsRequest
): Promise<CreateGroupsResponse> => request(
  `${variables.API_BASE_URL}admin/group`,
  {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  }
)
