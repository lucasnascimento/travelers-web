import { z as zod } from 'zod'
import * as ReactQuery from '@tanstack/react-query'

import { authenticate } from '../../services'
import { useForm as useBaseForm } from '../../hooks'
import { formTexts } from '../../constants'
import { AuthenticateRequest } from '../../types'
import { LocalStorage } from '../../utils'

export const useForm = () => {
  const schema = zod.object({
    username: zod
      .string({
        required_error: formTexts.required,
      })
      .email({ message: formTexts.email })
      .min(6, { message: formTexts.required }),
    password: zod
      .string({
        required_error: formTexts.required,
      })
      .min(6, { message: formTexts.required }),
  })

  const validation = useBaseForm<{ password: string, username: string }>(
    schema
  )

  return validation
}

const AUTHENTICATE_QUERY = 'use_authenticate'

export const useAuthenticate = () => {
  const { mutateAsync: rawMutate, ...rest } = ReactQuery.useMutation({
    mutationFn: (data: {
      payload: any
    }) => (
      authenticate(data.payload)
    ),
    mutationKey: [AUTHENTICATE_QUERY],
  })
  const handleMutation = (payload: AuthenticateRequest) => (
    rawMutate({ payload }).then((response) => LocalStorage.saveLogin(response))
  )

  return {
    ...rest,
    mutate: handleMutation,
  }
}
