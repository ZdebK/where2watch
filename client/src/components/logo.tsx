import React from 'react';
import logoImage from '../assets/where2watch-logo.png';

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

export function Logo({ onClick, className = '' }: LogoProps) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center cursor-pointer ${className}`}
    >
      <img 
        src={logoImage} 
        alt="Where2Watch" 
        className="h-9 w-auto object-contain"
        style={{ maxHeight: '42px' }}
      />
    </div>
  );
}
