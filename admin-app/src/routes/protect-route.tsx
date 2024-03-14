import * as React from 'react'
import { Navigate } from 'react-router-dom'

import { useGlobalContext } from '../providers'
import { routes } from './index'

type Props = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const { password } = useGlobalContext()
  const isLoggedIn = !!password

  return isLoggedIn ? children : <Navigate to={routes.login.path} />
}
