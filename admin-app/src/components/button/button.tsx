import * as React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

export type Props = {
  fullWidth?: boolean
  className?: string
  colorScheme?: 'blue'
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline'
  type?: 'button' | 'submit' | 'reset'
  icon?: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'> & { title?: string | undefined; titleId?: string | undefined; } & React.RefAttributes<SVGSVGElement>>
  label: string
  loading?: boolean
  onClick?: () => void
}

const sizesClasses = {
  lg: 'px-6 py-4 text-lg',
  md: 'px-4 py-3 text-base',
  sm: 'px-3 py-2 text-sm',
  xs: 'px-2 py-1 text-xs',
}

const getVariantClasses = (colorScheme: string) => {
  return {
    outline: 'inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600',
    solid: 'inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600',
  }
}

const rawButtonClasses = 'rounded text-center transition flex gap-2 items-center justify-center'

export const Button = ({
  className,
  colorScheme = 'blue',
  disabled = false,
  icon: Icon,
  label,
  loading = false,
  size = 'md',
  type = 'button',
  variant = 'solid',
  fullWidth = false,
  ...props
}: Props) => {
  const fullWidthClass = fullWidth ? 'w-full' : ''
  const variantClasses = getVariantClasses(colorScheme)[variant]
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
  const buttonClasses = `${fullWidthClass} ${rawButtonClasses} ${sizesClasses[size]} ${variantClasses} ${className} ${disabledClasses}`

  return (
    <button className={`${buttonClasses}`} type={type} disabled={disabled || loading} {...props}>
      {!loading && Icon && <Icon className="h-5 w-5" />}
      {loading ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : null}
      {label}
    </button>
  )
}
