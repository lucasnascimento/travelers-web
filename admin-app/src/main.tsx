import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { LocalStorage } from './utils'

import { ErrorBoundary, ReactQueryProvider } from './providers'
import { Router } from './routes'
import { variables } from './config'
import { FullPageLoader } from './components'

import './index.css'
import 'date-input-polyfill'

const secondsToVerify = 60 * 5
setInterval(() => {
  const expiresInEpoch = LocalStorage.loadExpiresInEpoch()
  const currentEpoch = new Date().getTime() / 1000
  const isTokenExpired = expiresInEpoch < currentEpoch

  if (expiresInEpoch && isTokenExpired) {
    LocalStorage.removeAccessToken()
    LocalStorage.removeExpiresInEpoch()

    window.location.href = '/login'
  }
}, secondsToVerify)

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
