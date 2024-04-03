export type Group = {
  description: string
  id: string
  inserted_at: string
  is_deleted: boolean
}

export type ListGroupsResponse = {
  data: Group[]
}
