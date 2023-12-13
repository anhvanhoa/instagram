/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
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
        },
    },
    plugins: [],
}
