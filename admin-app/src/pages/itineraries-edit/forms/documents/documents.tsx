import * as React from 'react'

import {
  Button,
  Card,
  ConfirmationModal,
  Modal,
  Input,
  RegisterListTable,
  RegisterListTableCol,
  RegisterListTableRow,
  useModal,
} from '../../../../components'
import { scrollToTop } from '../../../../utils'

import {
  useCreateItinerariesDocuments,
  useFormItineraryDocuments,
  useListItinerariesDocuments,
  useRemoveItinerariesRule,
  useUploadItinerariesDocuments,
} from './hooks'
import { STRINGS } from './strings'

type Props = {
  id?: string
  onSuccess: () => void
  onError: () => void
}

export const Documents = ({ id, onError, onSuccess }: Props) => {
  const [documentIdToRemove, setDocumentIdToRemove] = React.useState<string | null>(null)
  const { data, isFetching, refetch } = useListItinerariesDocuments(id || '')
  const {
    isOpen: isOpenDocumentConfirmation,
    onClose: onCloseDocumentConfirmation,
    onOpen: onOpenDocumentConfirmation,
  } = useModal()
  const { isOpen: isOpenDocumentCreation, onClose: onCloseDocumentCreation, onOpen: onOpenDocumentCreation } = useModal()
  const { isPending: isPendingRemoveItinerariesDocuments, mutateAsync: mutateAsyncRemoveItinerariesDocuments } =
    useRemoveItinerariesRule()
  const {
    formState: { errors: errorsItineraryDocuments },
    handleSubmit: handleSubmitItineraryDocuments,
    register: registerItineraryDocuments,
    reset: resetItineraryDocuments,
  } = useFormItineraryDocuments()
  const { isPending: isPendingCreateItinerariesDocuments, mutateAsync: mutateAsyncCreateItinerariesDocuments } =
    useCreateItinerariesDocuments()
  const { isPending: isPendingUploadItinerariesDocuments, mutateAsync: mutateAsyncUploadItinerariesDocuments } =
    useUploadItinerariesDocuments()

  const handleOnRemoveDocument = async () => {
    try {
      await mutateAsyncRemoveItinerariesDocuments({
        documentId: documentIdToRemove || '',
        itineraryId: id || '',
      })

      refetch()

      onSuccess()
    } catch {
      onError()
    } finally {
      onCloseDocumentConfirmation()
    }
  }

  const handleOnSubmitItineraryDocuments = async (rawData: any) => {
    try {
      const createDocumentPayload = {
        description: rawData.description,
        link: rawData.link,
        position: 0,
        title: rawData.title,
      }

      const createdDocument = await mutateAsyncCreateItinerariesDocuments({
        itineraryId: id || '',
        payload: createDocumentPayload,
      })

      if (rawData.file[0]) {
        const formData = new FormData()
        formData.append('file', rawData.file[0])

        await mutateAsyncUploadItinerariesDocuments({
          documentId: createdDocument.data.id,
          itineraryId: id || '',
          payload: formData,
        })
      }

      resetItineraryDocuments()
      onSuccess()
      refetch()
      scrollToTop()
    } finally {
      onCloseDocumentCreation()
    }
  }

  return (
    <>
      <Modal isOpen={isOpenDocumentCreation} onClose={onCloseDocumentCreation} title={STRINGS.modal_create_document_title}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitItineraryDocuments(handleOnSubmitItineraryDocuments)}>
          <div className="flex flex-col gap-8">
            <Input
              id="title"
              label={STRINGS.modal_create_document_input_title_label}
              placeholder={STRINGS.modal_create_document_input_title_placeholder}
              type="text"
              error={errorsItineraryDocuments.title?.message}
              {...registerItineraryDocuments('title')}
            />
            <Input
              id="description"
              label={STRINGS.modal_create_document_input_description_label}
              placeholder={STRINGS.modal_create_document_input_description_placeholder}
              type="text"
              error={errorsItineraryDocuments.description?.message}
              {...registerItineraryDocuments('description')}
            />
            <Input
              id="link"
              label={STRINGS.modal_create_document_input_link_label}
              placeholder={STRINGS.modal_create_document_input_link_placeholder}
              type="text"
              error={errorsItineraryDocuments.link?.message}
              {...registerItineraryDocuments('link')}
            />
            <Input
              id="file"
              label={STRINGS.modal_create_document_input_file_label}
              placeholder={STRINGS.modal_create_document_input_file_placeholder}
              type="file"
              error={errorsItineraryDocuments.link?.message}
              {...registerItineraryDocuments('file')}
            />
          </div>
          <div className="flex justify-between">
            <Button label={STRINGS.form_button_cancel_label} type="button" variant="outline" onClick={onCloseDocumentCreation} />
            <Button
              label={STRINGS.form_button_save_label}
              type="submit"
              loading={isPendingCreateItinerariesDocuments || isPendingUploadItinerariesDocuments}
            />
          </div>
        </form>
      </Modal>
      <ConfirmationModal
        isOpen={isOpenDocumentConfirmation}
        onCancel={onCloseDocumentConfirmation}
        onContinue={handleOnRemoveDocument}
        loading={isPendingRemoveItinerariesDocuments}
      />
      {isFetching ? (
        <div className="flex animate-pulse">
          <span className="w-full h-52 rounded-xl py-40 bg-gray-200 dark:bg-gray-700" />
        </div>
      ) : (
        <Card>
          <div className="p-4 flex flex-col gap-8">
            <h2 className="font-semibold text-xl mb-2 dark:text-white">{STRINGS.title}</h2>
            <RegisterListTable
              onClickCreate={onOpenDocumentCreation}
              loading={isFetching}
              headers={[STRINGS.table_header_title, STRINGS.table_header_description, STRINGS.table_header_url]}
            >
              {data?.data?.map((document) => (
                <RegisterListTableRow key={document.id}>
                  <RegisterListTableCol>{document.title}</RegisterListTableCol>
                  <RegisterListTableCol>
                    <a className="text-blue-500" href={document.link} target="_blank" rel="noreferrer">
                      {document.link}
                    </a>
                  </RegisterListTableCol>
                  <RegisterListTableCol>
                    <Button
                      label={STRINGS.table_body_button_remove}
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setDocumentIdToRemove(document.id)
                        onOpenDocumentConfirmation()
                      }}
                    />
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
