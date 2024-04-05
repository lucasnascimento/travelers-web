import type { ListItineraryRuleResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const listItinerariesRules = (
  accessToken: string,
  id: string
): Promise<ListItineraryRuleResponse> => request(
  `${variables.API_BASE_URL}admin/itinerary/${id}/rule`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
)
