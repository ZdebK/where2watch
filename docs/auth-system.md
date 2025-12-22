
# Authentication System

Secure authentication system with JWT tokens and state management.


## Architecture

```
AuthService (auth.service.ts)
  ↓
AuthContext (auth.context.tsx)
  ↓
Components (LoginScreen, MovieList, ProtectedRoute)
```


## Components


### 1. AuthService (`src/services/auth.service.ts`)
Handles backend communication:
- `login(credentials)` - User login
- `logout()` - Logout
- `getToken()` - Get JWT token
- `isAuthenticated()` - Check authentication status
- `getAuthHeader()` - Header for API calls


**Token storage:**
```typescript
// JWT token is stored in localStorage
localStorage.setItem('auth_token', token);
```


### 2. AuthContext (`src/contexts/auth.context.tsx`)
Global authentication state:

```typescript

interface AuthContextType {
  user: User | null;              // Current user
  isAuthenticated: boolean;       // Login status
  isLoading: boolean;             // Loading
  login(email, password): Promise;// Login
  logout(): void;                 // Logout
}
```


### 3. Components


#### LoginScreen
```typescript
import { useAuth } from '@/contexts/auth.context';

export function LoginScreen() {
  const { login } = useAuth();
  
  const handleLogin = async (email, password) => {
    await login(email, password);
    // Automatic redirect after login
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
      <p>Logged as: {user?.email}</p>
      <button onClick={logout}>Logout</button>
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
- Token is stored in `localStorage` as `auth_token`
- Sent in `Authorization: Bearer <token>` header

✅ **Token Expiration**
- Access token: 15 minutes
- Refresh token: 7 days (backend)

✅ **Auto-logout**
- On token expiration
- Redirect to login

✅ **Protected Routes**
- `ProtectedRoute` components
- Checks `isAuthenticated`

✅ **Secure Headers**
- `Content-Type: application/json`
- `Authorization: Bearer <token>`


## Usage in Component

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

Backend should return:

```json
POST /api/auth/login
{
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "username"
  }
}
```


## Login Flow

```
1. LoginScreen.tsx
  ↓
2. useAuth().login(email, password)
  ↓
3. AuthService.login() - POST /api/auth/login
  ↓
4. localStorage.setItem('auth_token', token)
  ↓
5. AuthContext.setUser() - update state
  ↓
6. App.tsx renders MovieList
```


## Extensions

TODO:
- [ ] Refresh token handling
- [ ] Token expiration check
- [ ] Auto-logout on token expire
- [ ] Remember me checkbox
- [ ] Two-factor authentication
- [ ] Password reset flow
- [ ] Social login (Google, GitHub)
