import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'manrope': ['Manrope', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				'tech-blue': {
					DEFAULT: 'hsl(var(--tech-blue))',
					foreground: 'hsl(var(--tech-blue-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'medium': 'var(--shadow-medium)',
				'strong': 'var(--shadow-strong)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				// Enhanced fade animations
				'fadeIn': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fadeInUp': {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fadeInDown': {
					'0%': { opacity: '0', transform: 'translateY(-40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fadeInScale': {
					'0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				// Enhanced slide animations
				'slideUp': {
					'0%': { opacity: '0', transform: 'translateY(60px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slideInLeft': {
					'0%': { opacity: '0', transform: 'translateX(-100px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slideInRight': {
					'0%': { opacity: '0', transform: 'translateX(100px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				// Enhanced bounce animations
				'bounceIn': {
					'0%': { opacity: '0', transform: 'scale(0.3) translateY(30px)' },
					'50%': { opacity: '1', transform: 'scale(1.05) translateY(-10px)' },
					'70%': { transform: 'scale(0.98) translateY(5px)' },
					'100%': { opacity: '1', transform: 'scale(1) translateY(0)' }
				},
				'bounceInScale': {
					'0%': { opacity: '0', transform: 'scale(0.3)' },
					'50%': { opacity: '1', transform: 'scale(1.1)' },
					'70%': { transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				// Enhanced scale animations
				'scaleIn': {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'scaleInSpring': {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'50%': { opacity: '1', transform: 'scale(1.05)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				// Enhanced rotate animations
				'rotateIn': {
					'0%': { opacity: '0', transform: 'rotate(-15deg) scale(0.9)' },
					'100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' }
				},
				'rotateInScale': {
					'0%': { opacity: '0', transform: 'rotate(-180deg) scale(0.5)' },
					'100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' }
				},
				// Glow and pulse animations
				'pulseGlow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' 
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--primary) / 0.4)' 
					}
				},
				'pulseScale': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'glowPulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--accent) / 0.3)',
						borderColor: 'hsl(var(--accent) / 0.3)'
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--accent) / 0.6), 0 0 60px hsl(var(--accent) / 0.4)',
						borderColor: 'hsl(var(--accent) / 0.6)'
					}
				},
				// Float and hover animations
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-15px)' }
				},
				'floatSlow': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				// Advanced scroll animations
				'scrollFadeIn': {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scrollSlideLeft': {
					'0%': { opacity: '0', transform: 'translateX(-80px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'scrollSlideRight': {
					'0%': { opacity: '0', transform: 'translateX(80px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'scrollSlideUp': {
					'0%': { opacity: '0', transform: 'translateY(80px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scrollScale': {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'scrollRotateIn': {
					'0%': { opacity: '0', transform: 'rotate(-10deg) scale(0.8)' },
					'100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' }
				},
				// Interactive animations
				'hoverLift': {
					'0%': { transform: 'translateY(0) scale(1)' },
					'100%': { transform: 'translateY(-8px) scale(1.02)' }
				},
				'pressDown': {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(0.95)' }
				},
				// Shimmer and shine effects
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'shine': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				// Smooth slide animations
				'slide-down': {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'rotate-in-180': {
					'0%': { transform: 'rotate(-180deg)', opacity: '0' },
					'100%': { transform: 'rotate(0deg)', opacity: '1' }
				},
				// Morphing animations
				'morphWidth': {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				},
				'ripple': {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'100%': { transform: 'scale(4)', opacity: '0' }
				}
			},
			animation: {
				// Basic animations with enhanced timing
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fadeIn': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'fadeInUp': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'fadeInDown': 'fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'fadeInScale': 'fadeInScale 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
				// Enhanced slide animations
				'slideUp': 'slideUp 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
				'slideInLeft': 'slideInLeft 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
				'slideInRight': 'slideInRight 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
				// Enhanced bounce animations
				'bounceIn': 'bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'bounceInScale': 'bounceInScale 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				// Enhanced scale animations
				'scaleIn': 'scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'scaleInSpring': 'scaleInSpring 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				// Enhanced rotate animations
				'rotateIn': 'rotateIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'rotateInScale': 'rotateInScale 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				// Glow and pulse animations
				'pulseGlow': 'pulseGlow 2s ease-in-out infinite',
				'pulseScale': 'pulseScale 2s ease-in-out infinite',
				'glowPulse': 'glowPulse 2.5s ease-in-out infinite',
				// Float and hover animations
				'float': 'float 3s ease-in-out infinite',
				'floatSlow': 'floatSlow 4s ease-in-out infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				// Scroll-triggered animations
				'scroll-fade-in': 'scrollFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'scroll-slide-left': 'scrollSlideLeft 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'scroll-slide-right': 'scrollSlideRight 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'scroll-slide-up': 'scrollSlideUp 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'scroll-scale': 'scrollScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'scroll-rotate-in': 'scrollRotateIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				// Interactive animations
				'hoverLift': 'hoverLift 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'pressDown': 'pressDown 0.1s ease-out',
				// Effect animations
				'shimmer': 'shimmer 2s linear infinite',
				'shine': 'shine 1.5s ease-in-out infinite',
				// Slide animations
				'slide-down': 'slide-down 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'slide-up': 'slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				'rotate-in-180': 'rotate-in-180 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
				// Morphing animations
				'morphWidth': 'morphWidth 0.5s ease-out',
				'ripple': 'ripple 0.6s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
