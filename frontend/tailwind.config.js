module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ],
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out both',
        fadeIn: 'fadeIn 0.8s ease-out both'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0B2D4A', // Deep Blue
          800: '#075985',
          900: '#0c4a6e'
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#226A3A', // Forest Green
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        zjnnp: {
          gray: '#F4F4F4',
          dark: '#1C1C1C'
        },
        medical: {
          green: '#2ecc71',
          blue: '#103b55',
          teal: '#1f5f43',
          dark: '#1E293B',
          muted: '#64748B',
          light: '#F9FAFB',
          navy: '#1A202C'
        },
        metrics: {
          impact: '#48BB78',
          citations: '#4F46E5',
          acceptance: '#ED8936'
        },
        background: '#f1eee9',
        text: '#333333'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Lora', 'serif'],
        mono: ['Courier New', 'monospace']
      },
      fontSize: {
        'hero': ['36px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
        'title': ['24px', { lineHeight: '32px' }],
        'subtitle': ['20px', { lineHeight: '28px' }],
        'body': ['16px', { lineHeight: '24px' }],
        'small': ['14px', { lineHeight: '20px' }],
        'card-title': ['20px', { fontWeight: '600' }],
        'footer': ['14px', { letterSpacing: '0.5px' }]
      },
      boxShadow: {
        hover: '0 8px 16px rgba(0, 0, 0, 0.1)'
      },
      spacing: {
        '6.25': '1.5625rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
