import * as React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export type Props = {
  className?: string
  children: React.ReactNode
  onClose: () => void
  isOpen: boolean
  title?: string
}

const ModalComponent = ({
  children, className, isOpen, onClose, title,
}: Props) => {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="h-screen flex items-center justify-center fixed w-full z-90"
      onClick={onClose}
      onKeyDown={onClose}
      onKeyUp={onClose}
      role="button"
      tabIndex={0}
    >
      <div className="fixed inset-0 bg-black opacity-80" />
      <div
        className={`fixed bg-white dark:bg-gray-800 rounded min-w-96 ${className}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
      >
        <div className={`flex flex-row ${title ? 'justify-between' : 'justify-end'} py-5 px-7 border-b dark:border-gray-700`}>
          { title && <p className="font-bold text-gray-800 dark:text-white">{title}</p> }
          <XMarkIcon
            className="h-6 w-6 text-gray-800 dark:text-white cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="py-7 px-7">
          {children}
        </div>
      </div>
    </div>
  )
}

export const Modal = React.memo(ModalComponent)
