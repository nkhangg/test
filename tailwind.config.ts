import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/theme/**/*.{js,ts,jsx,tsx,mdx}',
        './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {},
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            width: {
                main: '1280px',
                mobile: '484px',

                'slide-btn': '48px',
            },
            height: {
                header: '80px',
                navbar: '38px',
                'slide-btn': '48px',
            },
            colors: {
                'green-main': '#A3E635',
                'green-main-dark': '#65A30D',
                'green-dark-md': '#065F46',
                'green-86EFAC': '#86EFAC',
                'green-5FA503': '#5FA503',
                'black-main': '#374151',
                'fill-heart': '#FB7185',
            },
            borderColor: {
                'green-main': '#A3E635',
                'green-main-dark': '#65A30D',
                'gray-primary': '#DBDBDB',
            },
            backgroundColor: {
                'green-65a30d': '#65A30D',
            },
            fontSize: {
                '1xl': '16px',
                '7xl': '48px',
            },
            boxShadow: {
                primary: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
            },
        },
    },
    plugins: [],
};
export default config;
