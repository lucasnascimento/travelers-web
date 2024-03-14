import * as ReactQuery from '@tanstack/react-query'

import {
  getInstitutionsDetails,
  getInstitutionsItineraries,
} from '../../services'

const GET_INSTITUTIONS_DETAILS_QUERY = 'use_get_institutions_details'
const GET_INSTITUTIONS_ITINERARIES_QUERY = 'use_get_institutions_itineraries'

export const useGetInstitutionsDetails = (id: string, password: string) => {
  const resultQuery = ReactQuery.useSuspenseQuery({
    queryFn: () => getInstitutionsDetails(id, password),
    queryKey: [GET_INSTITUTIONS_DETAILS_QUERY],
  })

  return resultQuery
}

export const useGetInstitutionsItineraries = (
  institutionId: string,
  password: string
) => {
  const resultQuery = ReactQuery.useSuspenseQuery({
    queryFn: () => getInstitutionsItineraries(institutionId, password),
    queryKey: [GET_INSTITUTIONS_ITINERARIES_QUERY],
  })

  return resultQuery
}
