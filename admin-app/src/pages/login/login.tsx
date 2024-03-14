import { Alert, Button, Input } from '../../components'
import { COMMON_STRINGS } from '../../strings'

import { STRINGS } from './strings'
import { useForm, useAuthenticate } from './hooks'

export const Login = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm()
  const { isError, isPending, mutate } = useAuthenticate()

  const handleOnSubmit = (data: any) => mutate(data)

  return (
    <main className="h-full p-6 flex items-center justify-center">
      <div className="min-w-96 flex flex-col gap-4">
        {
          isError ? (
            <Alert
              title={COMMON_STRINGS.error_title}
              description={COMMON_STRINGS.error_description}
              type="error"
            />
          ) : <></>
        }
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="flex flex-col gap-3">
              <Input
                id="username"
                type="text"
                label={STRINGS.email_label}
                placeholder={STRINGS.email_placeholder}
                error={errors.username?.message}
                {...register('username')}
              />
              <Input
                id="password"
                type="text"
                label={STRINGS.password_label}
                placeholder={STRINGS.password_placeholder}
                error={errors.password?.message}
                {...register('password')}
              />
            </div>
            <div className="mt-6">
              <Button
                label="Entrar"
                type="submit"
                fullWidth
                loading={isPending}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
