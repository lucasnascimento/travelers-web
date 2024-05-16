// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const createItinerariesRuleData = {
  data: {
    id: '6486d01e-bc33-411c-9f31-2e9c24c7e939',
    inserted_at: '2024-01-15T23:21:36.348669',
    installments: 3,
    is_deleted: false,
    itinerary_id: '90f473da-d00f-4243-b019-a7dcd94154e6',
    montly_interest: '0',
    pix_discount: '0.028221512',
    position: 1,
    purchase_deadline: '2024-03-15',
    seat_price: '3756',
    updated_at: '2024-01-15T23:21:36.348682',
  },
}

export const createItinerariesRule = http.post(
  `${variables.API_BASE_URL}admin/itinerary/:id/rule`,
  () => HttpResponse.json({
    status: 200,
    ...createItinerariesRuleData,
  })
)
