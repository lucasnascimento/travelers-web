import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  HomeIcon,
  MapPinIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'

import { Button } from '..'
import { routes } from '../../routes'

export type Props = {
  children: React.ReactNode
  title: string
  breadcrumbs: {
    title: string
    path?: string
  }[]
  description?: string
}

export const highlightActiveMenuItem = (checkPath: string): boolean => {
  const currentPath = window.location.pathname
  const isActivePath = currentPath === checkPath || currentPath.startsWith(`${checkPath}/`)

  return isActivePath
}

export const DashboardWrapper = ({
  breadcrumbs, children, description, title,
}: Props) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const handleOnChangeTheme = () => {
    setIsDarkMode((prev) => !prev)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <>
      <header className="p-6 bg-white flex items-center justify-between border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800">
        <p className="flex-none text-xl font-semibold text-gray-800 dark:text-white">
          TravelersApp
        </p>
        <nav className="flex gap-2">
          <Button
            label={isDarkMode ? 'Modo claro' : 'Modo escuro'}
            variant="outline"
            size="sm"
            icon={isDarkMode ? SunIcon : MoonIcon}
            onClick={handleOnChangeTheme}
          />
          <Button
            label="Sair"
            colorScheme="gray"
            variant="outline"
            size="sm"
          />
        </nav>
      </header>
      <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center py-4">
          <button type="button" className="text-gray-500 hover:text-gray-600" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
            <span className="sr-only">Diminuir navegação</span>
            <svg className="size-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
          {
            breadcrumbs.length > 1
              ? (
                <ol className="ms-3 flex items-center whitespace-nowrap" aria-label="Breadcrumb">
                  {
                    breadcrumbs.map((breadcrumb) => {
                      if (breadcrumb.path) {
                        return (
                          <li key={breadcrumb.title} className="flex items-center text-sm text-gray-800 dark:text-gray-400">
                            <Link
                              className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
                              to={breadcrumb.path}
                            >
                              {breadcrumb.title}
                            </Link>
                            <svg className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </li>
                        )
                      }

                      return (
                        <li key={breadcrumb.title} className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400" aria-current="page">
                          {breadcrumb.title}
                        </li>
                      )
                    })
                  }
                </ol>
              )
              : <></>
          }
        </div>
      </div>

      <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-6">
          <p className="flex-none text-xl font-semibold text-gray-800 dark:text-white">
            TravelersApp
          </p>
        </div>

        <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
          <ul className="space-y-1.5">
            <li>
              <Link
                className={`flex items-center gap-x-3.5 py-2 px-2.5 ${highlightActiveMenuItem(routes.home.path) ? 'bg-gray-100' : ''} text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                to={routes.home.path}
              >
                <HomeIcon className="size-4" />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                className={`flex items-center gap-x-3.5 py-2 px-2.5 ${highlightActiveMenuItem(routes.institutions.path) ? 'bg-gray-100' : ''} text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                to={routes.institutions.path}
              >
                <BuildingOfficeIcon className="size-4" />
                Instituições
              </Link>
            </li>

            <li>
              <Link
                className={`flex items-center gap-x-3.5 py-2 px-2.5 ${highlightActiveMenuItem(routes.itineraries.path) ? 'bg-gray-100' : ''} text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                to={routes.itineraries.path}
              >
                <MapPinIcon className="size-4" />
                Roteiros
              </Link>
            </li>

            <li>
              <Link
                className={`flex items-center gap-x-3.5 py-2 px-2.5 ${highlightActiveMenuItem(routes.finances.path) ? 'bg-gray-100' : ''} text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
                to={routes.finances.path}
              >
                <CurrencyDollarIcon className="size-4" />
                Finanças
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
        <header className="mb-8">
          {
            breadcrumbs.length > 1
              ? (
                <ol className="hidden lg:block mb-4 flex items-center whitespace-nowrap" aria-label="Breadcrumb">
                  {
                    breadcrumbs.map((breadcrumb) => {
                      if (!breadcrumb.path) {
                        return (
                          <li key={breadcrumb.title} className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200" aria-current="page">
                            {breadcrumb.title}
                          </li>
                        )
                      }

                      return (
                        <li key={breadcrumb.title} className="inline-flex items-center">
                          <Link
                            to={breadcrumb.path}
                            className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
                          >
                            {breadcrumb.title}
                          </Link>
                          <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </li>
                      )
                    })
                  }
                </ol>
              )
              : <></>
          }
          <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">
            {title}
          </h1>
          {
            description
              ? (
                <p className="text-md text-gray-800 dark:text-gray-400">
                  {description}
                </p>
              )
              : <></>
          }
        </header>
        {children}
      </div>
    </>
  )
}
