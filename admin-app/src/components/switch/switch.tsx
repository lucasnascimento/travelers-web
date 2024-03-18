import * as React from 'react'

export type Props = {
  defaultValue?: boolean
  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Switch = React.forwardRef<HTMLInputElement, Props>(
  ({
    defaultValue = false, label, onChange, ...rest
  }, ref) => (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={label.replace(/\s+/g, '-').toLowerCase()}
        className="relative w-[2.75rem] h-6 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600 before:inline-block before:size-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
        defaultChecked={defaultValue}
        onChange={onChange}
        {...rest}
        ref={ref}
      />
      <label htmlFor={label.replace(/\s+/g, '-').toLowerCase()} className="text-sm text-gray-500 ms-3 dark:text-gray-400">
        {label}
      </label>
    </div>
  )
)
