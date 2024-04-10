import * as ReactQuery from '@tanstack/react-query'
import { z as zod } from 'zod'

import { updateGroups } from '../../services'
import { LocalStorage } from '../../utils/local-storage'
import { useForm as useBaseForm } from '../../hooks'
import { formTexts } from '../../constants'

const UPDATE_GROUPS_QUERY = 'use_update_groups'

export const useUpdateGroups = () => {
  const accessToken = LocalStorage.loadAccessToken()

  const resultMutation = ReactQuery.useMutation({
    mutationFn: (data: {
      id: string,
      payload: any
    }) => (
      updateGroups(accessToken, data.id, data.payload)
    ),
    mutationKey: [UPDATE_GROUPS_QUERY],
  })

  return resultMutation
}

export const useForm = (defaultValues?: any) => {
  const schema = zod.object({
    description: zod
      .string({
        required_error: formTexts.required,
      })
      .min(2, { message: formTexts.required }),
  })

  type FormValues = (typeof schema)['_output']

  const validation = useBaseForm<FormValues>(schema, defaultValues)

  return validation
}
