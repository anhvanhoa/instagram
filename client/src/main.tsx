import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './config/firebase'
import './index.css'
import ProviderAuth from './providers/AuthProvider.tsx'
import { ToastProvider } from './providers/ToastProvider.tsx'
const theme = localStorage.getItem('theme')
theme !== 'dark' && window.document.lastElementChild?.classList.remove('dark')
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ProviderAuth>
                <ToastProvider>
                    <App />
                </ToastProvider>
            </ProviderAuth>
        </QueryClientProvider>
    </React.StrictMode>,
)
