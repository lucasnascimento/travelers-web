import * as React from 'react'

type Props = {
  id: string
  label: string
  name: string
  placeholder: string
  error?: string
  tip?: string
  className?: string
  options: {
    value: string | number
    label: string
  }[]
}

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({
    className, error, id, label, name, options, placeholder, tip, ...rest
  }, ref) => (
    <fieldset className={`flex flex-col ${className}`}>
      <label
        className="mb-2 block text-md font-semibold dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        ref={ref}
        className={`py-3 px-4 block w-full ${error ? 'border-red-500 dark:border-red-900' : 'border-gray-200 dark:border-gray-700'} rounded-lg text-sm ${error ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'} disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600`}
        id={id}
        name={name}
        defaultValue=""
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        }
      </select>
      {error ? <p className="text-red-500 text-xs">{error}</p> : null}
      {!error && tip ? <p className="text-gray-600 text-xs">{tip}</p> : null}
    </fieldset>
  )
)
