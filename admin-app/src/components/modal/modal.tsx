import * as React from 'react'

import { XMarkIcon } from '@heroicons/react/24/outline'

export type Props = {
  className?: string
  children: React.ReactNode
  onClose: () => void
  isOpen: boolean
}

const ModalComponent = ({
  children, className, isOpen, onClose,
}: Props) => {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="h-screen flex items-center justify-center fixed w-full z-0"
      onClick={onClose}
      onKeyDown={onClose}
      onKeyUp={onClose}
      role="button"
      tabIndex={0}
    >
      <div className="fixed inset-0 bg-black opacity-80" />
      <div
        className={`fixed bg-white rounded px-7 py-5 min-w-96 ${className}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
      >
        <div className="flex flex-row justify-end mb-3">
          <XMarkIcon
            className="h-6 w-6 text-gray-800 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export const Modal = React.memo(ModalComponent)
