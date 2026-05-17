import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#1a1a2e',
          bgAlt: '#16213e',
          player: '#00ff88',
          spike: '#ff4757',
          block: '#4cc9f0',
        },
        dark: {
          900: '#0a0e27',
          800: '#1a1f3a',
          700: '#2d3561',
          600: '#3f4680',
        },
        accent: {
          cyan: '#00e5ff',
          purple: '#8b5cf6',
          pink: '#ec4899',
          amber: '#f59e0b',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'rgba(255, 255, 255, 0.05)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 229, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 229, 255, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 229, 255, 0.3)',
        'glow-md': '0 0 20px rgba(0, 229, 255, 0.5)',
        'glow-lg': '0 0 40px rgba(0, 229, 255, 0.7)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 20px 60px rgba(0, 229, 255, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config
