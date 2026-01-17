import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200';
  
  const variantStyles = {
    solid: 'bg-[#4B1B6F] text-white hover:bg-[#7B3FF2] active:scale-95',
    outline: 'border-2 border-[#4B1B6F] text-[#4B1B6F] hover:bg-[#4B1B6F] hover:text-white',
    ghost: 'text-[#4B1B6F] hover:bg-[#4B1B6F]/10',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
