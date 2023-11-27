/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            borderRadius: {
                circle: '50%',
            },
            fontSize: {
                s: '0.625rem',
            },
            colors: {
                primary: '#0095f6',
                second: '#737373',
                hovSidebar: '#F2F2F2',
                input: '#efefef',
            },
            width: {
                sidebar: '245px',
            },
            spacing: {
                'small-sidebar': '74px',
            },
            animation: {
                logoScale: 'scale 0.1s linear',
                pulseInfo: 'pulseInfo 1.5s cubic-bezier(0.4, 0, 0.6, 1)',
                pulseInfoPrev: 'pulseInfoPrev 1.5s cubic-bezier(0.4, 0, 0.6, 1)',
            },
            keyframes: {
                scale: {
                    '0%': { transform: 'scale(0.8)' },
                    '100%': { transform: 'scale(1)' },
                },
                pulseInfo: {
                    '0%': { opacity: '0.2' },
                    '100%': { opacity: '1' },
                },
                pulseInfoPrev: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0.2' },
                },
            },
            boxShadow: {
                '3xl': '1px 1px 40px #ccc',
            },
        },
    },
    plugins: [],
};
