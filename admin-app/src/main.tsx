import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { ErrorBoundary, GlobalContextProvider, ReactQueryProvider } from './providers'
import { Router } from './routes'
import { variables } from './config'
import { FullPageLoader } from './components'

import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'date-input-polyfill'

const prepare = async () => {
  if (variables.MOCK_ENABLED === 'true') {
    const { setupMocks } = await import('./mocks')

    return setupMocks()
  }

  return Promise.resolve()
}

prepare().then(() => {
  const element = document.getElementById('root') as HTMLElement

  ReactDOM.createRoot(element).render(
    <React.StrictMode>
      <ErrorBoundary>
        <GlobalContextProvider>
          <ReactQueryProvider>
            <React.Suspense fallback={<FullPageLoader />}>
              <Router />
            </React.Suspense>
          </ReactQueryProvider>
        </GlobalContextProvider>
      </ErrorBoundary>
    </React.StrictMode>
  )
})
