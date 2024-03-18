import * as React from 'react'
import { Navigate } from 'react-router-dom'

import { LocalStorage } from '../utils'
import { routes } from './index'

type Props = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const loginData = LocalStorage.loadLogin()
  const accessToken = loginData?.access_token
  const isLoggedIn = !!accessToken

  return isLoggedIn ? children : <Navigate to={routes.login.path} />
}
