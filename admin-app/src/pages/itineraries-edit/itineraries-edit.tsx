import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Alert, DashboardWrapper } from '../../components'

import {
  Documents, GeneralData, Itineraries, ItineraryDetails, PaymentData,
} from './forms'
import { useGetItinerary } from './hooks'

import { STRINGS } from './strings'

export const ItinerariesEdit = () => {
  const [updatedWithSuccess, setUpdatedWithSuccess] = React.useState(false)
  const [updatedWithError, setUpdatedWithError] = React.useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useGetItinerary(id || '')

  const handleOnCancel = () => navigate(-1)
  const handleOnSuccess = () => {
    setUpdatedWithSuccess(true)
    setUpdatedWithError(false)
  }
  const handleOnError = () => {
    setUpdatedWithSuccess(false)
    setUpdatedWithError(true)
  }

  return (
    <DashboardWrapper title={STRINGS.title} breadcrumbs={[{ title: STRINGS.title }]}>
      <main className="flex flex-col gap-8 pb-12">
        <h2 className="block text-xl font-semibold text-gray-800 sm:text-2xl dark:text-white">
          {data?.data.institution?.name}
          :
          {data?.data.title}
        </h2>

        {updatedWithSuccess && <Alert title={STRINGS.update_success} type="success" />}
        {updatedWithError && <Alert title={STRINGS.update_error} type="error" />}

        <GeneralData id={id} onCancel={handleOnCancel} onSuccess={handleOnSuccess} onError={handleOnError} />
        <PaymentData id={id} onCancel={handleOnCancel} onSuccess={handleOnSuccess} onError={handleOnError} />
        <ItineraryDetails id={id} onCancel={handleOnCancel} onSuccess={handleOnSuccess} onError={handleOnError} />
        <Itineraries id={id} onSuccess={handleOnSuccess} onError={handleOnError} />
        <Documents id={id} onSuccess={handleOnSuccess} onError={handleOnError} />
      </main>
    </DashboardWrapper>
  )
}
