import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Home, Institutions, Itineraries, ItinerariesEdit, Login, NotFound,
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
  itineraries_edit: {
    getPath: (id: string) => `/roteiros/${id}/editar`,
    path: '/roteiros/:id/editar',
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
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    path: routes.home.path,
  },
  {
    element: (
      <ProtectedRoute>
        <Institutions />
      </ProtectedRoute>
    ),
    path: routes.institutions.path,
  },
  {
    element: (
      <ProtectedRoute>
        <Itineraries />
      </ProtectedRoute>
    ),
    path: routes.itineraries.path,
  },
  {
    element: (
      <ProtectedRoute>
        <ItinerariesEdit />
      </ProtectedRoute>
    ),
    path: routes.itineraries_edit.path,
  },
])

export const Router = () => <RouterProvider router={router} />
