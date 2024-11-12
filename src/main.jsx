import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Layout } from './layouts/Layout.jsx'
import App from './App.jsx'
import { GuildsProvider } from '../src/context/GuildContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GuildsProvider>
      <Layout>
        <App />
      </Layout>
    </GuildsProvider>
  </BrowserRouter>,
)