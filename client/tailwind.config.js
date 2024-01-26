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
                hidden: {
                    '0%': { opacity: '0' },
                    '50%': { opacity: '0.8' },
                    '100%': { opacity: '0' },
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
                show: 'hidden .8s ease-in-out forwards',
            },
            spacing: {
                'notify-search': 'calc(100% + 67px)',
            },
            backgroundColor: {
                'hover-sidebar': 'rgb(var(--hover-sidebar))',
            },
        },
    },
    plugins: [],
}
