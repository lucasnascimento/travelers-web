// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

export const removeItinerariesEntries = http.get(
  `${variables.API_BASE_URL}api/admin/itinerary/:itineraryId/entry/:entryId`,
  () => HttpResponse.json({
    status: 204,
  })
)
