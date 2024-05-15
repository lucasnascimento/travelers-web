import * as React from 'react'
import { Controller } from 'react-hook-form'

import { Button, Card, RichTextEditor } from '../../../../components'
import { formatDateAmerican, scrollToTop } from '../../../../utils'

import { useFormItinerary, useGetItinerary, useUpdateItineraries } from './hooks'
import { STRINGS } from './strings'

export type Props = {
  id?: string
  onCancel: () => void
  onSuccess: () => void
  onError: () => void
}

export const ItineraryDetails = ({ id, onCancel, onError, onSuccess }: Props) => {
  const { data, isFetching } = useGetItinerary(id || '')
  const {
    control: controlItinerary,
    formState: { errors: errorsItinerary },
    handleSubmit: handleSubmitItinerary,
    reset: resetItinerary,
  } = useFormItinerary()
  const { isPending, mutateAsync } = useUpdateItineraries()

  React.useEffect(() => {
    resetItinerary({
      ...(data?.data || {}),
    })
  }, [data?.data])

  const handleOnSubmitItinerary = async (rawData: any) => {
    const itineraryData = {
      ...rawData,
      boarding_date: formatDateAmerican(rawData.boarding_date),
      landing_date: formatDateAmerican(rawData.landing_date),
    }

    try {
      await mutateAsync({
        id: id || '',
        payload: itineraryData,
      })

      onSuccess()
    } catch (err) {
      onError()
    }

    scrollToTop()
  }

  return isFetching ? (
    <div className="flex animate-pulse">
      <span className="w-full h-52 rounded-xl py-40 bg-gray-200 dark:bg-gray-700" />
    </div>
  ) : (
    <form className="flex flex-col gap-4" onSubmit={handleSubmitItinerary(handleOnSubmitItinerary)}>
      <Card>
        <div className="p-4 flex flex-col gap-8">
          <h2 className="font-semibold text-xl mb-2 dark:text-white">{STRINGS.title}</h2>
          <Controller
            name="details"
            control={controlItinerary}
            render={({ field: { onChange, ...rest } }) => (
              <RichTextEditor
                label={STRINGS.form_input_details_label}
                error={errorsItinerary.details?.message}
                onChange={(event) => onChange({ target: { value: event } })}
                content={data?.data?.details}
                {...rest}
              />
            )}
          />
          <Controller
            name="summary"
            control={controlItinerary}
            render={({ field: { onChange, ...rest } }) => (
              <RichTextEditor
                label={STRINGS.form_input_summary_label}
                error={errorsItinerary.summary?.message}
                onChange={(event) => onChange({ target: { value: event } })}
                content={data?.data?.summary}
                {...rest}
              />
            )}
          />
          <Controller
            name="services"
            control={controlItinerary}
            render={({ field: { onChange, ...rest } }) => (
              <RichTextEditor
                label={STRINGS.form_input_services_label}
                error={errorsItinerary.services?.message}
                onChange={(event) => onChange({ target: { value: event } })}
                content={data?.data?.services}
                {...rest}
              />
            )}
          />
          <Controller
            name="terms_and_conditions"
            control={controlItinerary}
            render={({ field: { onChange, ...rest } }) => (
              <RichTextEditor
                label={STRINGS.form_input_terms_and_conditions_label}
                error={errorsItinerary.terms_and_conditions?.message}
                onChange={(event) => onChange({ target: { value: event } })}
                content={data?.data?.terms_and_conditions}
                {...rest}
              />
            )}
          />
          <Controller
            name="cancelation_rules"
            control={controlItinerary}
            render={({ field: { onChange, ...rest } }) => (
              <RichTextEditor
                label={STRINGS.form_input_cancelation_rules_label}
                error={errorsItinerary.cancelation_rules?.message}
                onChange={(event) => onChange({ target: { value: event } })}
                content={data?.data?.cancelation_rules}
                {...rest}
              />
            )}
          />
        </div>
      </Card>
      <div className="flex justify-between">
        <Button label={STRINGS.form_button_cancel_label} type="button" variant="outline" onClick={onCancel} />
        <Button label={STRINGS.form_button_save_label} type="submit" loading={isPending} />
      </div>
    </form>
  )
}
