// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const createInstitutionsData = {
  data: {
    description: 'nome do grupo',
    id: '521577eb-fec7-4cac-9669-59d0c40a53ec',
  },
}

export const createInstitutions = http.post(
  `${variables.API_BASE_URL}admin/group`,
  () => HttpResponse.json({
    status: 200,
    ...createInstitutionsData,
  })
)
