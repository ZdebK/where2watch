import logoImage from '../assets/where2watch-logo.png';

interface LogoProps {
  onClick?: () => void;
  className?: string;
  maxHeight?: number; // pixels
}

export function Logo({ onClick, className = '', maxHeight = 42 }: LogoProps) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center cursor-pointer ${className}`}
    >
      <img 
        src={logoImage} 
        alt="Where2Watch" 
        className="w-auto object-contain"
        style={{ maxHeight: `${maxHeight}px`, height: 'auto' }}
      />
    </div>
  );
}
