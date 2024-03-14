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
    value: string
    label: string
  }[]
}

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({
    className, error, id, label, name, options, placeholder, tip, ...rest
  }, ref) => (
    <fieldset className={`flex flex-col ${className}`}>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        ref={ref}
        className={`mb-2 shadow appearance-none border ${error ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
