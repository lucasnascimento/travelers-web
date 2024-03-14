// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const bookingItinerariesData = {
  data: {
    booking_id: 'a334148b-09a3-4890-b736-89ddc4ba0aa3',
    invoice_url: 'https://faturas.iugu.com/b9303024-9297-417c-8e3d-9af8e273921a-e7f7',
  },
}

export const bookingItineraries = http.post(
  `${variables.API_BASE_URL}api/public/booking/itineraries/:id`,
  () => HttpResponse.json({
    status: 200,
    ...bookingItinerariesData,
  })
)
