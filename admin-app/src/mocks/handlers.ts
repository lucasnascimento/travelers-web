import { authenticate } from '../services/authenticate/authenticate.msw'
import { listInstitutions } from '../services/list-institutions/list-institutions.msw'
import { createInstitutions } from '../services/create-institutions/create-institutions.msw'

export const handlers = [
  authenticate,
  createInstitutions,
  listInstitutions,
]
