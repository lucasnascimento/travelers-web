import { request } from '../base'
import { variables } from '../../config'

export const removeItinerariesEntries = (
  accessToken: string,
  itineraryId: string,
  entryId: string
): Promise<void> => request(
  `${variables.API_BASE_URL}admin/itinerary/${itineraryId}/entry/${entryId}`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'DELETE',
  }
)
