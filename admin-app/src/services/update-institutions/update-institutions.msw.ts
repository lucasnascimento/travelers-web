// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const updateInstitutionsData = {
  data: {
    active_on_website: false,
    banking_account: {
      account_number: '1234-5',
      bank_agency: '0001',
      bank_code: '341',
    },
    document: '00.000.000/0001-91',
    file_id: null,
    has_banking_account: true,
    id: '521577eb-fec7-4cac-9669-59d0c40a53ec',
    inserted_at: 'Wed, 20 Mar 2024 17:40:04 GMT',
    is_deleted: false,
    name: 'PueriDomus Betel',
    ranking: '9999',
    updated_at: 'Wed, 20 Mar 2024 17:40:04 GMT',
  },
}

export const updateInstitutions = http.post(
  `${variables.API_BASE_URL}admin/institution/:id`,
  () => HttpResponse.json({
    status: 200,
    ...updateInstitutionsData,
  })
)
