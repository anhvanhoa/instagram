/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                xs: '480px',
            },
            keyframes: {
                'shake-glide': {
                    '0%': {
                        opacity: '0',
                        transform: 'translate(-50%, -50%) rotate(10deg)',
                    },
                    '25%': {
                        opacity: '1',
                        transform: 'translate(-50%, -50%) rotate(-10deg)',
                    },
                    '50%': {
                        opacity: '1',
                        transform: 'translate(-50%, -50%) rotate(10deg)',
                    },
                    '75%': {
                        opacity: '1',
                        transform: 'translate(-50%, -50%) rotate(-10deg)',
                    },
                    '90%': {
                        opacity: '1',
                        transform: 'translate(150%, -500%) rotate(0deg)',
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'translate(150%, -500%) rotate(0deg)',
                    },
                },
                toastify: {
                    '0%': { transform: 'translateY(100%)' },
                    '20%': { transform: 'translateY(0)' },
                    '80%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                zoom: {
                    '0%': { transform: 'scale(0.8)' },
                    '100%': { transform: 'scale(1)' },
                },
            },
            colors: {
                primary: '#0095F6',
                'hover-btn-primary': '#1A77F2',
                'hover-button': '#1F4A79',
                second: 'rgb(var(--background-second-rgb))',
                main: 'rgb(var(--background-rgb))',
                third: 'rgb(var(--background-third-rgb))',
            },
            boxShadow: {
                '3xl': '0 0 10px rgba(0, 0, 0, 0.1)',
                sidebar: '0 0 10px rgba(0, 0, 0, 0.2)',
            },
            animation: {
                'shake-glide': 'shake-glide .8s ease-in-out forwards',
                toastify: 'toastify 3s ease-in-out forwards',
                zoom: 'zoom 0.1s ease-in-out',
            },
        },
    },
    plugins: [],
}
