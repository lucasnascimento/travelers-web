import * as ReactRouter from 'react-router-dom'

import { routes } from '../../routes'
import { Button } from '../button'

import { STRINGS } from './strings'

type Props = {
  title: string
  description: string
  onBack?: () => void
  onHome?: () => void
}

export const ErrorMessageFullPage = ({
  description,
  onBack,
  onHome,
  title,
}: Props) => {
  const navigate = ReactRouter.useNavigate()

  const handleOnClickBack = () => {
    if (onBack) {
      onBack()
    }

    navigate(-1)
  }
  const handleOnClickHome = () => {
    if (onHome) {
      onHome()
    }

    navigate(routes.home.path)
  }

  return (
    <>
      <main className="h-full p-6 flex items-center justify-center">
        <div className="p-16 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="font-semibold text-3xl font-bold text-gray-800 dark:text-white">
              {title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="mt-14 flex gap-4">
            <Button
              label={STRINGS.go_home_label}
              onClick={handleOnClickHome}
              fullWidth
            />
            <Button
              label={STRINGS.back_label}
              onClick={handleOnClickBack}
              variant="outline"
              colorScheme="gray"
              fullWidth
            />
          </div>
        </div>
      </main>
      {/* <div className="bg-white container mx-auto h-screen flex flex-col items-center justify-center gap-4 px-8">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h1 className="font-semibold text-3xl text-gray-800 text-center">
          { title }
        </h1>
        <p className="text-md text-gray-500 text-center">
          { description }
        </p>
      </div>
      <div className="flex items-center mt-6 gap-x-3">
        <button
          type="button"
          onClick={handleOnClickBack}
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
        >
          <svg xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>

          <span>Voltar</span>
        </button>

        <button
          type="button"
          onClick={handleOnClickHome}
          className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
        >
          Ir pra home
        </button>
      </div>
    </div> */}
    </>
  )
}
