import * as React from 'react'
import { Navigate } from 'react-router-dom'

import { LocalStorage } from '../utils'
import { FullPageLoader } from '../components'

import { routes } from './index'

type Props = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [accessToken, setAccessToken] = React.useState<string | undefined>(
    LocalStorage.loadAccessToken()
  )
  const expiresInEpoch = LocalStorage.loadExpiresInEpoch()
  const isLoggedIn = !!accessToken

  React.useEffect(() => {
    if (!isLoggedIn) {
      return setIsLoading(false)
    }

    const currentEpoch = new Date().getTime() / 1000
    const isTokenExpired = expiresInEpoch < currentEpoch

    if (isTokenExpired) {
      setAccessToken(undefined)
      LocalStorage.removeAccessToken()
      LocalStorage.removeExpiresInEpoch()
    }

    return setIsLoading(false)
  }, [])

  if (isLoading) {
    return <FullPageLoader />
  }

  return isLoggedIn
    ? children
    : <Navigate to={routes.login.path} />
}
