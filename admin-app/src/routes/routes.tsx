import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Home, Institutions, Login, NotFound,
} from '../pages'
import { ProtectedRoute } from './protect-route'

export const routes = {
  home: {
    path: '/',
  },
  institutions: {
    path: '/instituicoes',
  },
  itineraries: {
    path: '/roteiros',
  },
  finances: {
    path: '/financas',
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
    element: <Home />,
    path: routes.home.path,
  },
  {
    element: <Institutions />,
    path: routes.institutions.path,
  },
])

export const Router = () => <RouterProvider router={router} />
