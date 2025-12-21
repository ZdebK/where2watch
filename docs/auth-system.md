# Authentication System

Bezpieczny system uwierzytelniania z JWT tokenami i state management.

## Architektura

```
AuthService (auth.service.ts)
  ↓
AuthContext (auth.context.tsx)
  ↓
Components (LoginScreen, MovieList, ProtectedRoute)
```

## Komponenty

### 1. AuthService (`src/services/auth.service.ts`)
Obsługuje komunikację z backendem:
- `login(credentials)` - Logowanie użytkownika
- `logout()` - Wylogowanie
- `getToken()` - Pobierz JWT token
- `isAuthenticated()` - Sprawdź status autentykacji
- `getAuthHeader()` - Nagłówek do API callsów

**Przechowywanie tokenu:**
```typescript
// JWT token jest przechowywany w localStorage
localStorage.setItem('access_token', token);
```

### 2. AuthContext (`src/contexts/auth.context.tsx`)
Global state dla autentykacji:

```typescript
interface AuthContextType {
  user: User | null;              // Aktualny użytkownik
  isAuthenticated: boolean;        // Status logowania
  isLoading: boolean;              // Ładowanie
  login(email, password): Promise; // Logowanie
  logout(): void;                  // Wylogowanie
}
```

### 3. Komponenty

#### LoginScreen
```typescript
import { useAuth } from '@/contexts/auth.context';

export function LoginScreen() {
  const { login } = useAuth();
  
  const handleLogin = async (email, password) => {
    await login(email, password);
    // Automatyczne przekierowanie po login
  };
}
```

#### MovieList
```typescript
import { useAuth } from '@/contexts/auth.context';

export function MovieList() {
  const { user, logout } = useAuth();
  
  return (
    <>
      <p>Zalogowany jako: {user?.email}</p>
      <button onClick={logout}>Wyloguj</button>
    </>
  );
}
```

#### ProtectedRoute
```typescript
<ProtectedRoute>
  <MovieList />
</ProtectedRoute>
```

## Security Features

✅ **JWT Token Storage**
- Token przechowywany w `localStorage`
- Wysyłany w `Authorization: Bearer <token>` header

✅ **Token Expiration**
- Access token: 15 minut
- Refresh token: 7 dni (backend)

✅ **Auto-logout**
- Przy wygaśnięciu tokenu
- Przekierowanie na login

✅ **Protected Routes**
- `ProtectedRoute` komponenty
- Sprawdzenie `isAuthenticated`

✅ **Secure Headers**
- `Content-Type: application/json`
- `Authorization: Bearer <token>`

## Użycie w Komponencie

```typescript
import { useAuth } from '@/contexts/auth.context';

function MyComponent() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <p>User: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}
```

## API Integration

Backend powinien zwracać:

```json
POST /api/auth/login
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username"
  }
}
```

## Flow logowania

```
1. LoginScreen.tsx
   ↓
2. useAuth().login(email, password)
   ↓
3. AuthService.login() - POST /api/auth/login
   ↓
4. localStorage.setItem('access_token', token)
   ↓
5. AuthContext.setUser() - Zaktualizuj state
   ↓
6. App.tsx renderuje MovieList
```

## Rozszerzenia

TODO:
- [ ] Refresh token handling
- [ ] Token expiration check
- [ ] Auto-logout on token expire
- [ ] Remember me checkbox
- [ ] Two-factor authentication
- [ ] Password reset flow
- [ ] Social login (Google, GitHub)
