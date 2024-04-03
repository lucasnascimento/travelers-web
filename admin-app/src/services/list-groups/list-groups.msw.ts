// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const listGroupData = {
  data: [
    {
      description: 'Y11',
      id: 'e47d017d-e8c0-4397-a6aa-f94d6e9ba87b',
      inserted_at: 'Sat, 27 Jan 2024 20:17:00 GMT',
      is_deleted: false,
      updated_at: 'Sat, 27 Jan 2024 20:17:00 GMT',
    },
    {
      description: '5th grade',
      id: '66644dd0-d03d-11ee-a67f-6f50caf8bb67',
      inserted_at: 'Tue, 20 Feb 2024 19:14:40 GMT',
      is_deleted: false,
      updated_at: 'Tue, 20 Feb 2024 19:14:40 GMT',
    },
  ],
}

export const listGroups = http.get(
  `${variables.API_BASE_URL}api/admin/group`,
  () => HttpResponse.json({
    status: 200,
    ...listGroupData,
  })
)
