import { Logo } from './logo';

/**
 * Polished loading screen with gradient background and spinner.
 */
export function LoadingScreen({ label = 'Ładowanie...' }: { label?: string }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-pure-white"
      style={{
        background:
          'radial-gradient(ellipse at top, var(--w2w-dark-violet) 0%, var(--w2w-deep-navy) 60%)',
      }}
    >
      <div className="mb-8">
        <Logo className="text-3xl" />
      </div>
      <div className="relative w-12 h-12 mb-4">
        <span
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange"
          style={{ animation: 'spin 1s linear infinite' }}
        />
        <span
          className="absolute inset-2 rounded-full border-4 border-transparent border-t-soft-white"
          style={{ animation: 'spin 1.5s linear infinite reverse' }}
        />
      </div>
      <p className="text-sm text-soft-gray">
        {label}
      </p>
      <style>
        {`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}
      </style>
    </div>
  );
}
