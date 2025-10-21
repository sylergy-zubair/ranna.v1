'use client';

import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonColor = 'orange' | 'red' | 'blue' | 'green' | 'gray' | 'white';

export interface OrderNowButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  // Button appearance
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  
  // Content
  children?: ReactNode;
  text?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  
  // Behavior
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  
  // Modal functionality
  openModal?: boolean;
  onModalOpen?: () => void;
  
  // Styling effects
  fullWidth?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  glowEffect?: boolean;
  pulseEffect?: boolean;
  
  // Animation
  hoverScale?: boolean;
  bounce?: boolean;
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const variantClasses = {
  primary: {
    orange: 'bg-orange-600 text-white hover:bg-orange-700 border-orange-600',
    red: 'bg-red-600 text-white hover:bg-red-700 border-red-600',
    blue: 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600',
    green: 'bg-green-600 text-white hover:bg-green-700 border-green-600',
    gray: 'bg-gray-600 text-white hover:bg-gray-700 border-gray-600',
    white: 'bg-white text-gray-900 hover:bg-gray-50 border-white',
  },
  secondary: {
    orange: 'bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200',
    red: 'bg-red-50 text-red-700 hover:bg-red-100 border-red-200',
    blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
    green: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
    gray: 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200',
    white: 'bg-gray-50 text-white hover:bg-gray-100 border-gray-300',
  },
  outline: {
    orange: 'bg-transparent text-orange-600 hover:bg-orange-50 border-orange-600',
    red: 'bg-transparent text-red-600 hover:bg-red-50 border-red-600',
    blue: 'bg-transparent text-blue-600 hover:bg-blue-50 border-blue-600',
    green: 'bg-transparent text-green-600 hover:bg-green-50 border-green-600',
    gray: 'bg-transparent text-gray-600 hover:bg-gray-50 border-gray-600',
    white: 'bg-transparent text-white hover:bg-white/10 border-white',
  },
  ghost: {
    orange: 'bg-transparent text-orange-600 hover:bg-orange-50 border-transparent',
    red: 'bg-transparent text-red-600 hover:bg-red-50 border-transparent',
    blue: 'bg-transparent text-blue-600 hover:bg-blue-50 border-transparent',
    green: 'bg-transparent text-green-600 hover:bg-green-50 border-transparent',
    gray: 'bg-transparent text-gray-600 hover:bg-gray-50 border-transparent',
    white: 'bg-transparent text-white hover:bg-white/10 border-transparent',
  },
  gradient: {
    orange: 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 border-transparent',
    red: 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 border-transparent',
    blue: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 border-transparent',
    green: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 border-transparent',
    gray: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 border-transparent',
    white: 'bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-gray-200 border-transparent',
  },
};

export default function OrderNowButton({
  variant = 'primary',
  size = 'md',
  color = 'orange',
  children,
  text = 'Order Now',
  icon,
  iconPosition = 'right',
  href,
  onClick,
  openModal = false,
  onModalOpen,
  disabled = false,
  loading = false,
  fullWidth = false,
  rounded = true,
  shadow = false,
  glowEffect = false,
  pulseEffect = false,
  hoverScale = true,
  bounce = false,
  className = '',
  ...props
}: OrderNowButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant][color];
  
  const effectClasses = [
    hoverScale && !disabled && 'hover:scale-105 active:scale-95',
    bounce && !disabled && 'hover:animate-bounce',
    pulseEffect && !disabled && 'animate-pulse',
    fullWidth && 'w-full',
    rounded ? 'rounded-md' : 'rounded-none',
    shadow && 'shadow-lg hover:shadow-xl',
    glowEffect && !disabled && 'hover:shadow-2xl hover:shadow-orange-500/25',
  ].filter(Boolean).join(' ');

  const focusRingColor = color === 'white' ? 'focus:ring-gray-500' : `focus:ring-${color}-500`;

  const buttonClasses = `${baseClasses} ${sizeClass} ${variantClass} ${effectClasses} ${focusRingColor} ${className}`;

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      <span>{children || text}</span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );

  const handleClick = () => {
    if (openModal && onModalOpen) {
      onModalOpen();
    } else if (onClick) {
      onClick();
    }
  };

  if (href && !disabled && !openModal) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...props}
    >
      {content}
    </button>
  );
}
