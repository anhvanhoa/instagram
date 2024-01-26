import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProviderUser from './store/ProviderUser.tsx'
import './config/firebase'
import './index.css'
const theme = localStorage.getItem('theme')
theme !== 'dark' && window.document.lastElementChild?.classList.remove('dark')
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ProviderUser>
                <App />
            </ProviderUser>
        </QueryClientProvider>
    </React.StrictMode>,
)
