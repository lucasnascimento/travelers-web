import * as React from 'react'
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field'

type Props = {
  id: string
  name: string
  placeholder: string
  label?: string
  error?: string
  tip?: string
  value?: string | number
  defaultValue?: string | number
}

export const InputCurrency = React.forwardRef<CurrencyInputProps, Props>(
  ({
    defaultValue,
    error,
    id,
    label,
    name,
    placeholder,
    tip,
    ...rest
  }, forwardedRef) => (
    <fieldset className="flex flex-col">
      {
        label && (
          <label
            className="mb-2 block text-sm dark:text-white"
            htmlFor={id}
          >
            {label}
          </label>
        )
      }

      <div className="relative">
        <CurrencyInput
          ref={forwardedRef as React.RefObject<HTMLInputElement>}
          className={`py-3 px-4 block w-full ${error ? 'border-red-500 dark:border-red-900' : 'border-gray-200 dark:border-gray-700'} rounded-lg text-sm ${error ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'} disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600`}
          id={id}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          prefix="R$ "
          {...rest}
        />
      </div>

      {error ? <p className="mt-2 mb-2 text-red-500 dark:text-red-400 text-xs">{error}</p> : null}
      {!error && tip ? <p className="mt-2 mb-2 text-gray-600 dark:text-gray-200 text-xs">{tip}</p> : null}
    </fieldset>
  )
)
