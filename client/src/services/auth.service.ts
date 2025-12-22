import { getApiUrl } from "../utils/getApiUrl";

const TOKEN_KEY = 'auth_token';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

class AuthService {
  constructor() {
    // Initialization code can go here
  }

  /**
   * Get the authentication token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Store authentication token in localStorage
   */
  private setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Remove authentication token from localStorage
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${getApiUrl()}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        let errorMessage = 'Unable to login. Please try again.';

        try {
          const errorData = await response.json();
          if (errorData.message) {
            if (errorData.message.includes('Database')) {
              errorMessage = 'Server is currently unavailable. Please try again later.';
            } else if (errorData.message.includes('Invalid email or password')) {
              errorMessage = 'Invalid email or password. Please check your credentials.';
            } else {
              errorMessage = errorData.message;
            }
          }
        } catch {
          // If error response is not JSON, use default message
          if (response.status === 404) {
            errorMessage = 'Login service not found. Please contact support.';
          } else if (response.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          }
        }

        throw new Error(errorMessage);
      }

      const data: AuthResponse = await response.json();
      this.setToken(data.token);
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check your internet connection.');
      }
      throw error;
    }
  }

  /**
   * Get authentication headers for API requests
   */
  getAuthHeader(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }
}

export { AuthService };
export default new AuthService();
