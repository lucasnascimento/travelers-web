import * as ReactQuery from '@tanstack/react-query'

import { listGroups } from '../../services'
import { LocalStorage } from '../../utils/local-storage'

const LIST_GROUPS_QUERY = 'use_list_groups'

export const useListGroups = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultQuery = ReactQuery.useQuery({
    queryFn: () => listGroups(accessToken),
    queryKey: [LIST_GROUPS_QUERY],
  })

  return resultQuery
}
