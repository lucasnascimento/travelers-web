// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const listItinerariesRulesData = {
  data: [
    {
      id: '3ef9e64b-ece7-4a0a-81f7-6492a73c2b8c',
      inserted_at: 'Thu, 21 Mar 2024 21:33:20 GMT',
      installments: 5,
      is_deleted: false,
      itinerary_id: '4e52f4df-58a1-4d6e-a49a-b85a682226b1',
      montly_interest: '0',
      pix_discount: '0.041149575',
      position: 0,
      purchase_deadline: 'Mon, 15 Apr 2024 00:00:00 GMT',
      seat_price: '3062',
      updated_at: 'Thu, 21 Mar 2024 21:33:20 GMT',
    },
  ],
}

export const listItinerariesRules = http.get(
  `${variables.API_BASE_URL}api/admin/itinerary/:id/rule`,
  () => HttpResponse.json({
    status: 200,
    ...listItinerariesRulesData,
  })
)
