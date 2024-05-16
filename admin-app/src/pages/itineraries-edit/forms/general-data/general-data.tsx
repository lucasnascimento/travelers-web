import * as React from 'react'
import { Controller } from 'react-hook-form'

import { Button, Card, Input, InputDate, Select } from '../../../../components'
import { formatDateAmerican, scrollToTop } from '../../../../utils'

import { useFormItinerary, useGetItinerary, useListGroups, useUpdateItineraries } from './hooks'
import { STRINGS } from './strings'

const getCorrectDate = (rawDate: string | Date) => {
  const date = new Date(rawDate)
  const offset = date.getTimezoneOffset()
  date.setMinutes(date.getMinutes() + offset)

  return date
}

export type Props = {
  id?: string
  onCancel: () => void
  onSuccess: () => void
  onError: () => void
}

export const GeneralData = ({ id, onCancel, onError, onSuccess }: Props) => {
  const { data: dataGroups, isFetching: isFetchingGroups } = useListGroups()
  const { data: dataItinerary, isFetching: isFetchingItinerary } = useGetItinerary(id || '')
  const {
    control: controlItinerary,
    formState: { errors: errorsItinerary },
    handleSubmit: handleSubmitItinerary,
    register: registerItinerary,
    reset: resetItinerary,
  } = useFormItinerary()
  const { isPending, mutateAsync } = useUpdateItineraries()

  React.useEffect(() => {
    resetItinerary({
      ...(dataItinerary?.data || {}),
    })
  }, [dataItinerary?.data])

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

  const groups = dataGroups?.data
    ? dataGroups?.data.map((group) => ({
        label: group.description,
        value: group.id,
      }))
    : []
  const isFetching = isFetchingGroups || isFetchingItinerary

  return isFetching ? (
    <div className="flex animate-pulse">
      <span className="w-full h-52 rounded-xl py-40 bg-gray-200 dark:bg-gray-700" />
    </div>
  ) : (
    <form className="flex flex-col gap-4" onSubmit={handleSubmitItinerary(handleOnSubmitItinerary)}>
      <Card>
        <div className="p-4 flex flex-col gap-8">
          <h2 className="font-semibold text-xl mb-2 dark:text-white">{STRINGS.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Input
              id="title"
              label={STRINGS.form_input_name_label}
              placeholder={STRINGS.form_input_name_placeholder}
              type="text"
              error={errorsItinerary.title?.message}
              {...registerItinerary('title')}
            />
            <Select
              id="group_id"
              label={STRINGS.form_input_group_name_label}
              placeholder={STRINGS.form_input_group_name_placeholder}
              options={groups}
              error={errorsItinerary.group_id?.message}
              {...registerItinerary('group_id')}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Controller
              name="boarding_date"
              control={controlItinerary}
              render={({ field: { value, ...rest } }) => (
                <InputDate
                  id="boarding_date"
                  label={STRINGS.form_input_board_date_label}
                  value={value ? getCorrectDate(value) : new Date()}
                  error={errorsItinerary.boarding_date?.message}
                  {...rest}
                />
              )}
            />
            <Controller
              name="landing_date"
              control={controlItinerary}
              render={({ field: { value, ...rest } }) => (
                <InputDate
                  id="landing_date"
                  label={STRINGS.form_input_landing_date_label}
                  value={value ? getCorrectDate(value) : new Date()}
                  error={errorsItinerary.landing_date?.message}
                  {...rest}
                />
              )}
            />
          </div>
          <Input
            id="seats"
            label={STRINGS.form_input_seats_label}
            placeholder={STRINGS.form_input_seats_placeholder}
            type="number"
            error={errorsItinerary.seats?.message}
            {...registerItinerary('seats')}
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
