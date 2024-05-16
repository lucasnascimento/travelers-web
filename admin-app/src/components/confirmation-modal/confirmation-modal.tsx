import { Button } from '../button'
import { Modal } from '../modal'

import { STRINGS } from './strings'

type Props = {
  title? : string
  onCancel: () => void
  onContinue: () => void
  isOpen: boolean
  loading?: boolean
}

export const ConfirmationModal = ({
  isOpen,
  loading = false,
  onCancel,
  onContinue,
  title = STRINGS.title,
}: Props) => (
  <Modal isOpen={isOpen} onClose={onCancel} title={title}>
    <div className="flex justify-between">
      <Button label={STRINGS.button_cancel_label} variant="outline" onClick={onCancel} />
      <Button label={STRINGS.button_continue_label} variant="solid" onClick={onContinue} loading={loading} />
    </div>
  </Modal>
)
