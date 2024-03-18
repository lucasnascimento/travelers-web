import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { ErrorBoundary, GlobalContextProvider, ReactQueryProvider } from './providers'
import { Router } from './routes'
import { variables } from './config'
import { FullPageLoader } from './components'

import './index.css'
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
        <ReactQueryProvider>
          <React.Suspense fallback={<FullPageLoader />}>
            <Router />
          </React.Suspense>
        </ReactQueryProvider>
      </ErrorBoundary>
    </React.StrictMode>
  )
})
