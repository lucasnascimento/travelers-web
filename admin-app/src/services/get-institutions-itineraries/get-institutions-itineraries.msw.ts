// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const getInstitutionsItinerariesData = {
  data: [
    {
      boarding_date: 'Sat, 20 Jan 2024 00:00:00 GMT',
      cover_id: null,
      current_step: 'current_step',
      details: 'details',
      group_id: null,
      id: '90f473da-d00f-4243-b019-a7dcd94154e6',
      inserted_at: 'Mon, 15 Jan 2024 23:16:55 GMT',
      installments: 6,
      institution: {
        active_on_website: true,
        banking_account: {
          account_number: '1234-5',
          bank_agency: '0001',
          bank_code: '341',
        },
        document: '00.000.000/0001-91',
        file: {
          file_name: 'a25df4d7-a898-46c5-a157-9fb4fe1a0bcb__image_2.jpeg',
          id: 'a25df4d7-a898-46c5-a157-9fb4fe1a0bcb',
          mime: 'image/jpeg',
          path: 'https://media.licdn.com/dms/image/C5603AQG4hhfMzbQuqQ/profile-displayphoto-shrink_400_400/0/1516586879925?e=2147483647&v=beta&t=GpCSpOp1U-ZaqonbIAp27eFOfe6KA4J-NylNWm0ve2o',
          size_bytes: 209530,
        },
        file_id: 'a25df4d7-a898-46c5-a157-9fb4fe1a0bcb',
        has_banking_account: true,
        id: '1bee5aa0-9830-48e5-9977-9547403878d8',
        inserted_at: 'Mon, 15 Jan 2024 22:54:19 GMT',
        is_deleted: false,
        name: 'PueriDomus Betel',
        updated_at: 'Mon, 15 Jan 2024 22:54:19 GMT',
      },
      institution_id: '1bee5aa0-9830-48e5-9977-9547403878d8',
      is_deleted: false,
      landing_date: 'Wed, 31 Jan 2024 00:00:00 GMT',
      purchase_deadline: 'Mon, 15 Jan 2024 00:00:00 GMT',
      seat_price: '1234.56',
      seats: 40,
      services: 'services',
      status: 'status',
      summary: 'summary',
      terms_and_conditions: 'terms_and_conditions',
      title: 'title',
      updated_at: 'Mon, 15 Jan 2024 23:16:55 GMT',
    },
  ],
}

export const getInstitutionsItineraries = http.get(
  `${variables.API_BASE_URL}api/public/institutions/:institution_id/itineraries`,
  () => HttpResponse.json({
    status: 200,
    ...getInstitutionsItinerariesData,
  })
)
