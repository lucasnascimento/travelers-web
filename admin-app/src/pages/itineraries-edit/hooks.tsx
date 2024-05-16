import * as ReactQuery from '@tanstack/react-query'

import { getItinerary } from '../../services'
import { LocalStorage } from '../../utils/local-storage'

const GET_ITINERARY_QUERY = 'use_get_itinerary'
export const useGetItinerary = (id: string) => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultQuery = ReactQuery.useQuery({
    queryFn: () => getItinerary(accessToken, id),
    queryKey: [GET_ITINERARY_QUERY],
  })

  return resultQuery
}
