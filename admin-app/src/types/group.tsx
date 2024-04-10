export type Group = {
  description: string
  id: string
  inserted_at: string
  is_deleted: boolean
}

export type ListGroupsResponse = {
  data: Group[]
}

export type CreateGroupsRequest = {
  description: string
}

export type CreateGroupsResponse = {
  data: Group
}

export type UpdateGroupsRequest = {
  description?: string
  is_deleted?: boolean
}

export type UpdateGroupsResponse = {
  data: {
    success: boolean
  }
}
