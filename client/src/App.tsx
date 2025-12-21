import { LoginScreen } from './components/login-screen';
import { MovieList } from './components/movie-list';
import { LoadingScreen } from './components/loading-screen';
import { AuthProvider, useAuth } from './contexts/auth.context';
import { StreamingSitesProvider } from './contexts/streaming-sites.context';
import { Toaster } from 'sonner';

/**
 * Main App Content
 * Uses auth context to determine which screen to show
 */
function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {!isAuthenticated ? (
        <LoginScreen />
      ) : (
        <MovieList />
      )}
    </>
  );
}

/**
 * Main App Component
 * Wraps everything with AuthProvider and StreamingSitesProvider
 */
export default function App() {
  return (
    <AuthProvider>
      <StreamingSitesProvider>
        <AppContent />
        <Toaster richColors position="top-right" toastOptions={{ style: { zIndex: 9999 } }} />
      </StreamingSitesProvider>
    </AuthProvider>
  );
}
