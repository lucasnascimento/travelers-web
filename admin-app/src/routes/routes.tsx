import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Home, Institutions, Login, NotFound,
} from '../pages'
import { ProtectedRoute } from './protect-route'

export const routes = {
  finances: {
    path: '/financas',
  },
  home: {
    path: '/',
  },
  institutions: {
    path: '/instituicoes',
  },
  itineraries: {
    path: '/roteiros',
  },
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
  {
    element: <ProtectedRoute><Home /></ProtectedRoute>,
    path: routes.home.path,
  },
  {
    element: <ProtectedRoute><Institutions /></ProtectedRoute>,
    path: routes.institutions.path,
  },
])

export const Router = () => <RouterProvider router={router} />
