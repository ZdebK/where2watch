import React from 'react';

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

export function Logo({ onClick, className = '' }: LogoProps) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-0 cursor-pointer ${className}`}
    >
      <span style={{ color: 'var(--w2w-pure-white)' }}>Where</span>
      <span style={{ color: 'var(--w2w-orange)' }}>2</span>
      <span style={{ color: 'var(--w2w-pure-white)' }}>Watch</span>
    </div>
  );
}
