import * as React from 'react'
import Datepicker from 'tailwind-datepicker-react'

type Props = {
  id: string
  name: string
  label?: string
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  error?: string
  tip?: string
  className?: string
  value?: Date
}

const options = {
  clearBtnText: 'Limpar',
  inputDateFormatProp: {
    day: 'numeric' as const,
    month: 'numeric' as const,
    year: 'numeric' as const,
  },
  inputPlaceholderProp: 'dd/mm/aaaa',
  language: 'pt-BR',
  todayBtnText: 'Hoje',
  weekDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
}

export const InputDate = ({
  className,
  error,
  icon: Icon,
  id,
  label,
  tip,
  ...rest
}: Props) => {
  const [show, setShow] = React.useState(false)
  const handleSetShow = (state: boolean) => setShow(state)

  return (
    <fieldset className={`flex flex-col ${className}`}>
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
        {
            Icon && (
              <div className="absolute top-3 left-4">
                <Icon className="size-5 text-gray-400" aria-hidden="true" />
              </div>
            )
          }
        <Datepicker
          options={options}
          show={show}
          setShow={handleSetShow}
          {...rest}
        />
      </div>

      {error ? <p className="mt-2 mb-2 text-red-500 dark:text-red-400 text-xs">{error}</p> : null}
      {!error && tip ? <p className="mt-2 mb-2 text-gray-600 dark:text-gray-200 text-xs">{tip}</p> : null}
    </fieldset>
  )
}
