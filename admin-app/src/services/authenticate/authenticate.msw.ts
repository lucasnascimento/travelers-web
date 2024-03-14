// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const authenticateData = {
  data: {
    access_token: 'a334148b-09a3-4890-b736-89ddc4ba0aa3',
  },
}

export const authenticate = http.post(
  `${variables.API_BASE_URL}admin/login`,
  () => HttpResponse.json({
    status: 200,
    ...authenticateData,
  })
)
