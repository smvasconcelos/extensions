import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyles } from 'twin.macro'
import { Home } from './pages/Home/Home.page'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    {/* <PopupPage /> */}
    <Home />
  </React.StrictMode>,
)
