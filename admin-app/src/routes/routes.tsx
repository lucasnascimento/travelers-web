import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, NotFound } from '../pages'
import { ProtectedRoute } from './protect-route'

export const routes = {
  login: {
    path: '/login',
  },
  notFound: {
    path: '*',
  },
}

const router = createBrowserRouter([
  {
    element: <NotFound />,
    path: routes.notFound.path,
  },
  {
    element: <Login />,
    path: routes.login.path,
  },
])

export const Router = () => <RouterProvider router={router} />
