import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  Groups,
  GroupsCreate,
  GroupsEdit,
  Home,
  Institutions,
  Itineraries,
  ItinerariesCreate,
  ItinerariesEdit,
  Login,
  NotFound,
} from '../pages'
import { ProtectedRoute } from './protect-route'

export const routes = {
  finances: {
    path: '/financas',
  },
  groups: {
    path: '/grupos',
  },
  groupsCreate: {
    path: '/grupos/criar',
  },
  groupsEdit: {
    getPath: (id: string) => `/grupos/${id}/editar`,
    path: '/grupos/:id/editar',
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
  itinerariesCreate: {
    path: '/roteiros/criar',
  },
  itinerariesEdit: {
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
        <ItinerariesCreate />
      </ProtectedRoute>
    ),
    path: routes.itinerariesCreate.path,
  },
  {
    element: (
      <ProtectedRoute>
        <ItinerariesEdit />
      </ProtectedRoute>
    ),
    path: routes.itinerariesEdit.path,
  },
  {
    element: (
      <ProtectedRoute>
        <Groups />
      </ProtectedRoute>
    ),
    path: routes.groups.path,
  },
  {
    element: (
      <ProtectedRoute>
        <GroupsCreate />
      </ProtectedRoute>
    ),
    path: routes.groupsCreate.path,
  },
  {
    element: (
      <ProtectedRoute>
        <GroupsEdit />
      </ProtectedRoute>
    ),
    path: routes.groupsEdit.path,
  },
])

export const Router = () => <RouterProvider router={router} />
