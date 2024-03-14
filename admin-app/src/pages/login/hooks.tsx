import * as ReactQuery from '@tanstack/react-query'

import { getInstitutions } from '../../services'

const GET_INSTITUTIONS_QUERY = 'use_get_institutions'

export const useGetInstitutions = () => {
  const resultQuery = ReactQuery.useSuspenseQuery({
    queryFn: getInstitutions,
    queryKey: [GET_INSTITUTIONS_QUERY],
  })

  return resultQuery
}
