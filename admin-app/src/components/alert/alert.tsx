import { CheckIcon, XCircleIcon } from '@heroicons/react/24/outline'

export type Props = {
  title: string
  description?: string
  type: 'error' | 'success'
}

const iconsByType = {
  error: XCircleIcon,
  success: CheckIcon,
}

const classesByType = {
  error: 'bg-red-100 border border-red-500 text-red-700 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500 dark:text-red-400',
  success: 'bg-green-100 border border-green-500 text-green-700 dark:bg-green-800/10 dark:border-green-900 dark:text-green-500 dark:text-green-400',
}

export const Alert = ({ description, title, type }: Props) => {
  const Icon = iconsByType[type]
  const classes = classesByType[type]

  return (
    <div className={`${classes} p-4 rounded-lg flex items-center gap-3 w-full`}>
      <Icon className="h-6 w-6" />
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="text-xs">{description}</p>}
      </div>
    </div>
  )
}
