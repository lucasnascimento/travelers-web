import type { CreateItinerariesEntriesRequest, CreateItinerariesEntriesResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const updateItinerariesEntries = (
  accessToken: string,
  itineraryId: string,
  entryId: string,
  payload: CreateItinerariesEntriesRequest
  // eslint-disable-next-line max-params
): Promise<CreateItinerariesEntriesResponse> =>
  request(`${variables.API_BASE_URL}admin/itinerary/${itineraryId}/entry/${entryId}`, {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'PUT',
  })
