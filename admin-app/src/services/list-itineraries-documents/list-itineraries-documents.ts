import type { ListItineraryDocumentResponse } from '../../types'
import { request } from '../base'
import { variables } from '../../config'

export const listItinerariesDocuments = (
  accessToken: string,
  id: string
): Promise<ListItineraryDocumentResponse> => request(
  `${variables.API_BASE_URL}admin/itinerary/${id}/document`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
)
