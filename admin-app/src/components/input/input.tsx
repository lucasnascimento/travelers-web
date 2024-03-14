import * as React from 'react'
import InputMask, { ReactInputMask } from 'react-input-mask'

type Props = {
  id: string
  type: string
  label: string
  name: string
  placeholder: string
  error?: string
  tip?: string
  className?: string
  mask?: string | (string | RegExp)[]
  maskPlaceholder?: string
  alwaysShowMask?: boolean
}

export const Input = React.forwardRef<ReactInputMask, Props>(
  ({
    className, error, id, label, mask, name, placeholder, tip, type, ...rest
  }, forwardedRef) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const maskedInputRef = React.useRef<ReactInputMask>(null)
    const selectRef = mask ? maskedInputRef : inputRef

    React.useImperativeHandle(
      forwardedRef,
      () => selectRef.current as HTMLInputElement & ReactInputMask
    )

    return (
      <fieldset className={`flex flex-col ${className}`}>
        <label
          className="mb-2 block text-sm dark:text-white"
          htmlFor={id}
        >
          {label}
        </label>
        {
          mask && (
            <InputMask
              ref={selectRef as React.RefObject<ReactInputMask>}
              className={`mb-2 shadow appearance-none border ${error ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id={id}
              type={type}
              name={name}
              placeholder={placeholder}
              mask={mask}
              {...rest}
            />
          )
        }

        {
          !mask && (
            <input
              ref={selectRef as React.RefObject<HTMLInputElement>}
              className={`mb-2 py-3 px-4 block w-full ${error ? 'border-red-500 dark:border-red-900' : 'border-gray-200 dark:border-gray-700'} rounded-lg text-sm ${error ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'} disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600`}
              id={id}
              type={type}
              name={name}
              placeholder={placeholder}
              {...rest}
            />
          )
        }

        {error ? <p className="mb-2 text-red-500 dark:text-red-400 text-xs">{error}</p> : null}
        {!error && tip ? <p className="mb-2 text-gray-600 dark:text-gray-200 text-xs">{tip}</p> : null}
      </fieldset>
    )
  }
)