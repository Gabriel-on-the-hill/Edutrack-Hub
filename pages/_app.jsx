import '../styles/globals.css';
import { AuthProvider } from '../hooks/useAuth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
