import * as React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

export type Props = {
  fullWidth?: boolean
  className?: string
  colorScheme?: 'blue' | 'gray' | 'red'
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline'
  type?: 'button' | 'submit' | 'reset'
  icon?: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'> & { title?: string | undefined; titleId?: string | undefined; } & React.RefAttributes<SVGSVGElement>>
  iconPosition?: 'left' | 'right'
  label: string
  loading?: boolean
  onClick?: () => void
}

const sizesClasses = {
  lg: 'px-8 py-4 text-lg',
  md: 'px-6 py-3 text-base',
  sm: 'px-4 py-2 text-sm',
  xs: 'px-2 py-1 text-xs',
}

const getVariantClasses = (colorScheme: string) => {
  if (colorScheme === 'gray') {
    return {
      outline: 'inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600',
      solid: 'inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600',
    }
  }

  if (colorScheme === 'red') {
    return {
      outline: 'inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-red-500 text-red-500 hover:border-red-400 hover:text-red-400 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600',
      solid: 'inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-red-600',
    }
  }

  return {
    outline: 'inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600',
    solid: 'inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600',
  }
}

const rawButtonClasses = 'rounded text-center transition flex gap-2 items-center justify-center'

export const Button = ({
  className,
  colorScheme = 'blue',
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  label,
  loading = false,
  size = 'md',
  type = 'button',
  variant = 'solid',
  ...props
}: Props) => {
  const fullWidthClass = fullWidth ? 'w-full' : ''
  const variantClasses = getVariantClasses(colorScheme)[variant]
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
  const buttonClasses = `${fullWidthClass} ${rawButtonClasses} ${sizesClasses[size]} ${variantClasses} ${className} ${disabledClasses}`

  return (
    <button className={`${buttonClasses}`} type={type} disabled={disabled || loading} {...props}>
      {!loading && iconPosition === 'left' ? Icon && <Icon className="h-5 w-5" /> : <></>}
      {loading ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : null}
      {label}
      {!loading && iconPosition === 'right' ? Icon && <Icon className="h-5 w-5" /> : <></>}
    </button>
  )
}
