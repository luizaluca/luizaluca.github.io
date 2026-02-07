/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        medicenter_color: '#c471a3',
        gradiant_color: '#e2dedf',
        secondary_medicenter_color: '#8c9cac',
        third_color: '#667788',
      },
    },
  },
  plugins: [],
};
