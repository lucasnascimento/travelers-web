import { request } from '../base'
import { variables } from '../../config'

export const removeItinerariesDocuments = (
  accessToken: string,
  itineraryId: string,
  documentId: string
): Promise<void> => request(
  `${variables.API_BASE_URL}admin/itinerary/${itineraryId}/document/${documentId}`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'DELETE',
  }
)
