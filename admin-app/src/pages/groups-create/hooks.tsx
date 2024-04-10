import * as ReactQuery from '@tanstack/react-query'
import { z as zod } from 'zod'

import { createGroups } from '../../services'
import { LocalStorage } from '../../utils/local-storage'
import { useForm as useBaseForm } from '../../hooks'
import { formTexts } from '../../constants'

const CREATE_GROUPS_QUERY = 'use_create_groups'

export const useCreateGroups = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (payload: any) => (
      createGroups(accessToken, payload)
    ),
    mutationKey: [CREATE_GROUPS_QUERY],
  })

  return resultMutation
}

export const useForm = () => {
  const schema = zod.object({
    description: zod
      .string({
        required_error: formTexts.required,
      })
      .min(2, { message: formTexts.required }),
  })

  type FormValues = (typeof schema)['_output']

  const validation = useBaseForm<FormValues>(schema)

  return validation
}
