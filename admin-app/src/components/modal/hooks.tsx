import * as React from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const handleOpenModal = () => setIsOpen(true)
  const handleCloseModal = () => setIsOpen(false)

  return {
    isOpen,
    onClose: handleCloseModal,
    onOpen: handleOpenModal,
  }
}
