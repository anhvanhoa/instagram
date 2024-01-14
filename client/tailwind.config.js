/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
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
                second: '#EFEFEF',
            },
            boxShadow: {
                '3xl': '0 0 10px rgba(0, 0, 0, 0.1)',
                sidebar: '5px 0 10px rgba(0, 0, 0, 0.2)',
            },
            animation: {
                show: 'hidden .8s ease-in-out forwards',
            },
            spacing: {
                'notify-search': 'calc(100% + 67px)',
            },
        },
    },
    plugins: [],
}
