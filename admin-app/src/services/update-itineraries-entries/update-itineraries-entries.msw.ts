// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const updateItinerariesEntryData = {
  data: {
    description: 'description dia 03',
    id: '6833a332-1058-4b98-8e55-67fd9cad694a',
    inserted_at: 'Thu, 09 May 2024 05:18:47 GMT',
    is_deleted: false,
    itinerary_id: '4e52f4df-58a1-4d6e-a49a-b85a682226b1',
    position: 2,
    title: 'title dia 03',
    updated_at: 'Thu, 09 May 2024 05:18:47 GMT',
  },
}

export const updateItinerariesEntries = http.post(`${variables.API_BASE_URL}admin/itinerary/:itinerary_id/entry/:entry_id`, () =>
  HttpResponse.json({
    status: 200,
    ...updateItinerariesEntryData,
  })
)
