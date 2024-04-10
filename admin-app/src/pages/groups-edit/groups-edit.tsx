import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  Alert,
  Button,
  Card,
  DashboardWrapper,
  Input,
} from '../../components'
import { STRINGS } from './strings'
import { useForm, useUpdateGroups } from './hooks'

export const GroupsEdit = () => {
  const { id } = useParams()
  const location = useLocation()
  const {
    error, isPending, isSuccess, mutateAsync,
  } = useUpdateGroups()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    description: location.state.description,
  })
  const navigate = useNavigate()

  const handleOnCancel = () => navigate(-1)
  const handleOnSubmit = (rawData: any) => mutateAsync({
    id: id || '',
    payload: rawData,
  })

  return (
    <DashboardWrapper
      title={STRINGS.title}
      breadcrumbs={[
        { title: STRINGS.title },
      ]}
    >
      <main className="flex flex-col gap-8">
        {isSuccess && (
          <Alert title={STRINGS.create_success} type="success" />
        )}
        {error && (
          <Alert title={STRINGS.create_success} type="error" />
        )}
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <Card>
            <div className="p-4 flex flex-col gap-4">
              <Input
                id="title"
                label={STRINGS.form_input_description_label}
                placeholder={STRINGS.form_input_description_placeholder}
                type="text"
                error={errors.description?.message}
                {...register('description')}
              />
            </div>
          </Card>
          <div className="flex justify-between">
            <Button
              label={STRINGS.button_cancel_label}
              type="button"
              variant="outline"
              onClick={handleOnCancel}
            />
            <Button
              label={STRINGS.form_button_label}
              type="submit"
              loading={isPending}
            />
          </div>
        </form>
      </main>
    </DashboardWrapper>
  )
}
