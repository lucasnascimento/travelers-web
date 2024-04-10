// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const createInstitutionsData = {
  data: {
    success: true,
  },
}

export const createInstitutions = http.put(
  `${variables.API_BASE_URL}admin/group/:id`,
  () => HttpResponse.json({
    status: 200,
    ...createInstitutionsData,
  })
)
