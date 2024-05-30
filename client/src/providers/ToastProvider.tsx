import classNames from 'classnames'
import { createContext, useCallback, useState } from 'react'
import Toast from '~/components/Toast'

type TypeToast = 'success' | 'error' | 'info'

interface ToastProps {
    type?: TypeToast
    message: string
}

const ContextToast = createContext<{
    addToast: (props: ToastProps) => void
    removeToast: (id: number) => void
}>({
    addToast: () => {},
    removeToast: () => {},
})

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const variables: Record<TypeToast, string> = {
        success: 'bg-green-700',
        error: 'bg-red-600',
        info: 'bg-[#222]',
    }
    const [toasts, setToasts] = useState<ToastProps[]>([])
    const removeToast = useCallback((id: number) => {
        setToasts((prev) => [...prev.filter((_, index) => index !== id)])
    }, [])
    const addToast = useCallback(
        (props: ToastProps) => {
            setToasts([...toasts, props])
            setTimeout(() => {
                removeToast(toasts.length - 1)
            }, 3000)
        },
        [removeToast, toasts],
    )

    return (
        <>
            {toasts.map((toast, index) => (
                <div
                    key={index}
                    className={classNames(
                        'fixed bottom-0 w-full z-50 animate-toastify',
                        variables[toast.type || 'info'],
                    )}
                >
                    <Toast children={toast.message} />
                </div>
            ))}
            <ContextToast.Provider value={{ addToast, removeToast }}>
                {children}
            </ContextToast.Provider>
        </>
    )
}

export { ContextToast, ToastProvider }
