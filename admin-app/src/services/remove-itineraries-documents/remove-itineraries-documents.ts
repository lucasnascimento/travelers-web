import type { ListItineraryDocumentResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const removeItinerariesDocuments = (
  accessToken: string,
  itineraryId: string,
  documentId: string
): Promise<ListItineraryDocumentResponse> => request(
  `${variables.API_BASE_URL}admin/itinerary/${itineraryId}/document/${documentId}`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'DELETE',
  }
)
