/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#0095F6',
                'hover-btn-primary': '#1A77F2',
                'hover-button': '#1F4A79',
                second: '#EFEFEF'
            }
        }
    },
    plugins: []
}
