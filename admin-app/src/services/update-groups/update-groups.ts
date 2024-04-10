import type {
  UpdateGroupsRequest,
  UpdateGroupsResponse,
} from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const updateGroups = (
  accessToken: string,
  id: string,
  payload: UpdateGroupsRequest
): Promise<UpdateGroupsResponse> => request(
  `${variables.API_BASE_URL}admin/group/${id}`,
  {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'PUT',
  }
)
