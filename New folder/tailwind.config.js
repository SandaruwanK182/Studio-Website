module.exports = {
    content: ['./*.{html,js}'],
    theme: {
        extend: {
            colors: {
                primary: '#1a1a1a',
                secondary: '#4a4a4a',
                yellow: {
                    400: '#FBBF24',
                },
            },
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
            spacing: {
                '128': '32rem',
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
        },
    },
    variants: {
        extend: {
            scale: ['group-hover'],
            translate: ['group-hover'],
            rotate: ['group-hover'],
            opacity: ['group-hover'],
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
} 