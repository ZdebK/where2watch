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
    if (isLoading) return; // guard against double submit
    setError('');
    try {
      await login(email.trim(), password);
      toast.success('Zalogowano pomyślnie');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Nie udało się zalogować. Spróbuj ponownie.';
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
          <Logo className="justify-center mb-3" maxHeight={72} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div
              className="rounded-lg px-4 py-3 text-sm bg-orange-soft text-orange-soft"
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
              className="formField w-full"
              disabled={isLoading}
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
              className="formField w-full"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Logging in…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
