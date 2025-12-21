import React, { useState } from 'react';
import { Logo } from './logo';
import { useAuth } from '../contexts/auth.context';
import { toast } from 'sonner';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      toast.success('Zalogowano pomyślnie');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nie udało się zalogować. Spróbuj ponownie.';
      // Dodajemy przyjaźniejszy komunikat z podpowiedzią
      setError(`${message} Jeśli problem się powtarza, sprawdź połączenie lub spróbuj ponownie za chwilę.`);
      toast.error(message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `radial-gradient(ellipse at top, var(--w2w-dark-violet) 0%, var(--w2w-deep-navy) 50%)`,
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <Logo className="text-3xl justify-center mb-2" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div
              className="rounded-lg px-4 py-3 text-sm"
              style={{ backgroundColor: 'rgba(255, 138, 0, 0.15)', color: '#ffba7a' }}
              role="alert"
            >
              {error}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full px-4 py-3 rounded-lg transition-all outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--w2w-graphite)',
                color: 'var(--w2w-pure-white)',
                border: '1px solid transparent',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--w2w-orange)';
                e.target.style.boxShadow = '0 0 0 2px rgba(255, 138, 0, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'transparent';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 rounded-lg transition-all outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--w2w-graphite)',
                color: 'var(--w2w-pure-white)',
                border: '1px solid transparent',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--w2w-orange)';
                e.target.style.boxShadow = '0 0 0 2px rgba(255, 138, 0, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'transparent';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg transition-all"
            disabled={isLoading}
            style={{
              backgroundColor: 'var(--w2w-orange)',
              color: 'var(--w2w-pure-white)',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (isLoading) return;
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(255, 138, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              if (isLoading) return;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
