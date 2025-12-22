/**
 * Auth Service Test
 * Tests authentication service functions
 */

import { AuthService } from '../services/auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  const originalFetch = global.fetch;

  beforeEach(() => {
    authService = new AuthService();
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
    global.fetch = originalFetch;
  });

  /**
   * Test: Initial state - no token
   */
  it('should not have token on initialization', () => {
    expect(authService.getToken()).toBeNull();
  });

  /**
   * Test: Set token
   */
  it('should set and get token', () => {
    const testToken = 'test_jwt_token_123';
    authService['setToken'](testToken);
    expect(authService.getToken()).toBe(testToken);
  });

  /**
   * Test: Clear token
   */
  it('should clear token', () => {
    const testToken = 'test_jwt_token_123';
    authService['setToken'](testToken);
    expect(authService.getToken()).not.toBeNull();

    authService.logout();
    expect(authService.getToken()).toBeNull();
  });

  /**
   * Test: Check authentication status
   */
  it('should correctly report authentication status', () => {
    expect(authService.isAuthenticated()).toBe(false);

    authService['setToken']('test_token');
    expect(authService.isAuthenticated()).toBe(true);

    authService.logout();
    expect(authService.isAuthenticated()).toBe(false);
  });

  /**
   * Test: Get auth headers
   */
  it('should provide correct auth headers without token', () => {
    const headers = authService.getAuthHeader();
    expect(headers['Content-Type']).toBe('application/json');
    expect((headers as any)['Authorization']).toBeUndefined();
  });

  /**
   * Test: Get auth headers with token
   */
  it('should provide correct auth headers with token', () => {
    const testToken = 'test_jwt_token_123';
    authService['setToken'](testToken);

    const headers = authService.getAuthHeader();
    expect(headers['Content-Type']).toBe('application/json');
    expect((headers as any)['Authorization']).toBe(`Bearer ${testToken}`);
  });

  /**
   * Test: Surface server unavailable message when backend reports DB connectivity issues
   */
  it('should surface server unavailable message on database errors', async () => {
    const mockResponse = {
      ok: false,
      json: async () => ({ message: 'Database connection error' }),
    } as any;

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      authService.login({ email: 'user@test.com', password: 'password123' })
    ).rejects.toThrow('Server is currently unavailable. Please try again later.');
  });

  /**
   * Test: Surface server unavailable message on network failures
   */
  it('should surface server unavailable message on network failure', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('fetch failed'));

    await expect(
      authService.login({ email: 'user@test.com', password: 'password123' })
    ).rejects.toThrow('Cannot connect to server. Please check your internet connection.');
  });
});
