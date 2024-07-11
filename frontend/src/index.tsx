import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import { Global } from '@emotion/react'
import { globalStyles } from './styles/global'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>,
)
