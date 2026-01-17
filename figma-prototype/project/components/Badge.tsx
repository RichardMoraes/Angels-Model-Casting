import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gender' | 'status' | 'count' | 'department';
  color?: string;
  className?: string;
}

export function Badge({ children, variant = 'default', color, className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center px-2 py-0.5 rounded';
  
  const variantStyles = {
    default: 'bg-[#8B4DB8] text-white',
    gender: 'bg-[#4B1B6F] text-white',
    status: 'bg-[#7B3FF2]/20 text-[#4B1B6F]',
    count: 'bg-red-500 text-white min-w-[20px] h-5 rounded-full',
    department: color ? `bg-[${color}] text-white` : 'bg-[#5B6BFF] text-white',
  };

  return (
    <span 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={color && variant === 'department' ? { backgroundColor: color } : undefined}
    >
      {children}
    </span>
  );
}
