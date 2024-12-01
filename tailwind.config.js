/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          25: '#FCFCFD',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    'bg-gray-900',
    'bg-gray-800',
    'bg-gray-700',
    'bg-gray-100',
    'bg-gray-50',
    'text-gray-100',
    'text-gray-300',
    'text-gray-400',
    'text-gray-500',
    'text-gray-600',
    'text-gray-700',
    'text-gray-800',
    'border-gray-200',
    'border-gray-300',
    'border-gray-600',
    'border-gray-700',
    'border-gray-800',
    'hover:bg-gray-50',
    'hover:bg-gray-100',
    'hover:bg-gray-700',
    'hover:bg-gray-800',
    'bg-blue-50',
    'bg-blue-800',
    'bg-red-800',
    'border-blue-200',
    'border-blue-800',
    'border-red-800',
    'text-blue-100',
    'text-red-100',
    'text-blue-400',
    'text-red-400',
    'bg-emerald-50',
    'bg-rose-50',
    'border-emerald-200',
    'border-rose-200',
    'text-emerald-600',
    'text-red-600'
  ]
};