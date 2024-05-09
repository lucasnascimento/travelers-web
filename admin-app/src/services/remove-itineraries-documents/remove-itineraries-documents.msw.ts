// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

export const removeItinerariesDocuments = http.get(
  `${variables.API_BASE_URL}api/admin/itinerary/:itineraryId/document/:documentId`,
  () => HttpResponse.json({
    status: 204,
  })
)
