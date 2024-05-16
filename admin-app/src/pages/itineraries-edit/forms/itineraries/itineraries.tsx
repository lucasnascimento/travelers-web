import * as React from 'react'
import { Controller } from 'react-hook-form'

import {
  Button,
  Card,
  ConfirmationModal,
  Input,
  Modal,
  RegisterListTable,
  RegisterListTableCol,
  RegisterListTableRow,
  RichTextEditor,
  useModal,
} from '../../../../components'
import { scrollToTop } from '../../../../utils'

import {
  useCreateItinerariesEntries,
  useFormItineraryEntries,
  useListItinerariesEntries,
  useRemoveItinerariesEntry,
  useUpdateItinerariesEntries,
} from './hooks'
import { STRINGS } from './strings'

type Props = {
  id?: string
  onSuccess: () => void
  onError: () => void
}

export const Itineraries = ({ id, onError, onSuccess }: Props) => {
  const [entryIdToRemove, setEntryIdToRemove] = React.useState<string | null>(null)
  const [entryIdToUpdate, setEntryIdToUpdate] = React.useState<string | null>(null)

  const { isOpen: isOpenEntryCreation, onClose: onCloseEntryCreation, onOpen: onOpenEntryCreation } = useModal()
  const { isOpen: isOpenEntryUpdate, onClose: onCloseEntryUpdate, onOpen: onOpenEntryUpdate } = useModal()
  const { isOpen: isOpenEntryRemoval, onClose: onCloseEntryRemoval, onOpen: onOpenEntryRemoval } = useModal()
  const { data, isFetching, refetch } = useListItinerariesEntries(id || '')
  const {
    control: controlItineraryEntries,
    formState: { errors: errorsItineraryEntries },
    handleSubmit: handleSubmitItineraryEntries,
    register: registerItineraryEntries,
    reset: resetItineraryEntries,
  } = useFormItineraryEntries()
  const {
    control: controlUpdateItineraryEntries,
    formState: { errors: errorsUpdateItineraryEntries },
    handleSubmit: handleSubmitUpdateItineraryEntries,
    register: registerUpdateItineraryEntries,
    reset: resetUpdateItineraryEntries,
  } = useFormItineraryEntries()
  const { isPending: isPendingRemoveItinerariesEntries, mutateAsync: mutateAsyncRemoveItinerariesEntries } =
    useRemoveItinerariesEntry()
  const { isPending: isPendingCreateItinerariesEntries, mutateAsync: mutateAsyncCreateItinerariesEntries } =
    useCreateItinerariesEntries()
  const { isPending: isPendingUpdateItinerariesEntries, mutateAsync: mutateAsyncUpdateItinerariesEntries } =
    useUpdateItinerariesEntries()

  const handleOnRemoveEntry = async () => {
    try {
      await mutateAsyncRemoveItinerariesEntries({
        entryId: entryIdToRemove || '',
        itineraryId: id || '',
      })

      refetch()

      onSuccess()
    } catch {
      onError()
    } finally {
      onCloseEntryRemoval()
    }
  }

  const handleOnSubmitItineraryEntries = async (rawData: any) => {
    try {
      const payload = {
        description: rawData.description,
        position: rawData.position,
        title: rawData.title,
      }

      await mutateAsyncCreateItinerariesEntries({
        itineraryId: id || '',
        payload,
      })

      resetItineraryEntries()
      onSuccess()
      refetch()
      scrollToTop()
    } catch {
      onSuccess()
    } finally {
      onCloseEntryCreation()
    }
  }

  const handleOnSubmitUpdateItineraryEntries = async (rawData: any) => {
    try {
      const payload = {
        description: rawData.description,
        position: rawData.position,
        title: rawData.title,
      }

      await mutateAsyncUpdateItinerariesEntries({
        entryId: entryIdToUpdate || '',
        itineraryId: id || '',
        payload,
      })

      resetUpdateItineraryEntries()
      onSuccess()
      refetch()
      scrollToTop()
    } catch {
      onSuccess()
    } finally {
      onCloseEntryUpdate()
    }
  }

  return (
    <>
      <ConfirmationModal
        isOpen={isOpenEntryRemoval}
        onCancel={onCloseEntryRemoval}
        onContinue={handleOnRemoveEntry}
        loading={isPendingRemoveItinerariesEntries}
      />
      <Modal isOpen={isOpenEntryUpdate} onClose={onCloseEntryUpdate} title={STRINGS.modal_create_edit_title}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateItineraryEntries(handleOnSubmitUpdateItineraryEntries)}>
          <div className="flex flex-col gap-8">
            <Input
              id="title"
              label={STRINGS.modal_create_entry_input_title_label}
              placeholder={STRINGS.modal_create_entry_input_title_placeholder}
              type="text"
              error={errorsUpdateItineraryEntries.title?.message}
              {...registerUpdateItineraryEntries('title')}
            />
            <Input
              id="position"
              label={STRINGS.modal_create_entry_input_position_label}
              placeholder={STRINGS.modal_create_entry_input_position_placeholder}
              type="number"
              error={errorsUpdateItineraryEntries.position?.message}
              {...registerUpdateItineraryEntries('position')}
            />
            <Controller
              name="description"
              control={controlUpdateItineraryEntries}
              render={({ field: { onChange, value, ...rest } }) => (
                <RichTextEditor
                  label={STRINGS.modal_create_entry_input_description_label}
                  error={errorsUpdateItineraryEntries.description?.message}
                  onChange={(event) => onChange({ target: { value: event } })}
                  content={value}
                  {...rest}
                />
              )}
            />
          </div>
          <div className="flex justify-between">
            <Button label={STRINGS.form_button_cancel_label} type="button" variant="outline" onClick={onCloseEntryUpdate} />
            <Button label={STRINGS.form_button_save_label} type="submit" loading={isPendingUpdateItinerariesEntries} />
          </div>
        </form>
      </Modal>
      <Modal isOpen={isOpenEntryCreation} onClose={onCloseEntryCreation} title={STRINGS.modal_create_entry_title}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitItineraryEntries(handleOnSubmitItineraryEntries)}>
          <div className="flex flex-col gap-8">
            <Input
              id="title"
              label={STRINGS.modal_create_entry_input_title_label}
              placeholder={STRINGS.modal_create_entry_input_title_placeholder}
              type="text"
              error={errorsItineraryEntries.title?.message}
              {...registerItineraryEntries('title')}
            />
            <Input
              id="position"
              label={STRINGS.modal_create_entry_input_position_label}
              placeholder={STRINGS.modal_create_entry_input_position_placeholder}
              type="number"
              error={errorsItineraryEntries.position?.message}
              {...registerItineraryEntries('position')}
            />
            <Controller
              name="description"
              control={controlItineraryEntries}
              render={({ field: { onChange, ...rest } }) => (
                <RichTextEditor
                  label={STRINGS.modal_create_entry_input_description_label}
                  error={errorsItineraryEntries.description?.message}
                  onChange={(event) => onChange({ target: { value: event } })}
                  {...rest}
                />
              )}
            />
          </div>
          <div className="flex justify-between">
            <Button label={STRINGS.form_button_cancel_label} type="button" variant="outline" onClick={onCloseEntryCreation} />
            <Button label={STRINGS.form_button_save_label} type="submit" loading={isPendingCreateItinerariesEntries} />
          </div>
        </form>
      </Modal>
      {isFetching ? (
        <div className="flex animate-pulse">
          <span className="w-full h-52 rounded-xl py-40 bg-gray-200 dark:bg-gray-700" />
        </div>
      ) : (
        <Card>
          <div className="p-4 flex flex-col gap-8">
            <h2 className="font-semibold text-xl mb-2 dark:text-white">{STRINGS.title}</h2>
            <RegisterListTable
              onClickCreate={onOpenEntryCreation}
              loading={isFetching}
              headers={[STRINGS.table_header_position, STRINGS.table_header_title, STRINGS.table_header_description]}
            >
              {data?.data?.map((entry) => (
                <RegisterListTableRow key={entry.id}>
                  <RegisterListTableCol>{entry.position}</RegisterListTableCol>
                  <RegisterListTableCol>{entry.title}</RegisterListTableCol>
                  <RegisterListTableCol>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: entry.description,
                      }}
                    />
                  </RegisterListTableCol>
                  <RegisterListTableCol>
                    <div className="flex gap-2">
                      <Button
                        label={STRINGS.table_body_button_edit}
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          resetUpdateItineraryEntries({
                            description: entry.description,
                            position: String(entry.position),
                            title: entry.title,
                          })
                          setEntryIdToUpdate(entry.id)
                          onOpenEntryUpdate()
                        }}
                      />
                      <Button
                        label={STRINGS.table_body_button_remove}
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                        onClick={() => {
                          setEntryIdToRemove(entry.id)
                          onOpenEntryRemoval()
                        }}
                      />
                    </div>
                  </RegisterListTableCol>
                </RegisterListTableRow>
              ))}
            </RegisterListTable>
          </div>
        </Card>
      )}
    </>
  )
}
