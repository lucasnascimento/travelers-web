import * as ReactQuery from '@tanstack/react-query'

import { getItinerariesDetails } from '../../services'

const GET_ITINERARIES_DETAILS_QUERY = 'use_get_itineraries_details'

export const useGetItinerariesDetails = (id: string, password: string) => {
  const resultQuery = ReactQuery.useSuspenseQuery({
    queryFn: () => getItinerariesDetails(id, password),
    queryKey: [GET_ITINERARIES_DETAILS_QUERY],
  })

  return resultQuery
}
