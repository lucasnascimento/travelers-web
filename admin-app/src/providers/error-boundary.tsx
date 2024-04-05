import { ErrorBoundary as BaseErrorBoundary } from 'react-error-boundary'

import { ErrorMessageFullPage } from '../components'

type FallbackComponentProps = {
  resetErrorBoundary: () => void
}

const fallbackRender = ({ resetErrorBoundary }: FallbackComponentProps) => {
  const handleOnClick = () => resetErrorBoundary()

  return (
    <ErrorMessageFullPage
      title="Algo deu errado"
      description="Tente novamente mais tarde"
      onBack={handleOnClick}
      onHome={handleOnClick}
    />
  )
}

type ErrorBoundaryProps = {
  children: React.ReactNode
}

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => (
  <BaseErrorBoundary fallbackRender={fallbackRender}>
    { children }
  </BaseErrorBoundary>
)
