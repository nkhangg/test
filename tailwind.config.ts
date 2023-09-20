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
                'green-86EFAC': '#86EFAC',
                'black-main': '#374151',
            },
            borderColor: {
                'green-main': '#A3E635',
                'green-main-dark': '#65A30D',
            },
            backgroundColor: {
                'green-65a30d': '#65A30D',
            },
        },
    },
    plugins: [],
};
export default config;
