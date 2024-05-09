import { authenticate } from '../services/authenticate/authenticate.msw'
import { listInstitutions } from '../services/list-institutions/list-institutions.msw'
import { createInstitutions } from '../services/create-institutions/create-institutions.msw'
import { listItineraries } from '../services/list-itineraries/list-itineraries.msw'
import { updateItineraries } from '../services/update-itineraries/update-itineraries.msw'
import { listGroups } from '../services/list-groups/list-groups.msw'
import { listItinerariesDocuments } from '../services/list-itineraries-documents/list-itineraries-documents.msw'
import { removeItinerariesDocuments } from '../services/remove-itineraries-documents/remove-itineraries-documents.msw'

export const handlers = [
  authenticate,
  createInstitutions,
  listInstitutions,
  listItinerariesDocuments,
  removeItinerariesDocuments,
  listItineraries,
  listGroups,
  updateItineraries,
]
