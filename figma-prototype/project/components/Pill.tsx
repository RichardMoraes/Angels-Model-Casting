import React from 'react';

interface PillProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Pill({ children, variant = 'primary', className = '' }: PillProps) {
  const variantStyles = {
    primary: 'bg-[#8B4DB8] text-white hover:bg-[#7B3FF2]',
    secondary: 'bg-[#4B1B6F]/10 text-[#4B1B6F] hover:bg-[#4B1B6F]/20',
  };

  return (
    <span className={`inline-block px-4 py-2 rounded-[20px] transition-colors ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
