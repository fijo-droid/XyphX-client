import { createRoot } from 'react-dom/client'
import './index.css'
import Render from './Render';
import { AuthProvider } from './hooks/useAuth';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { trackEvent } from './lib/analytics';

// Track initial page view
trackEvent('page_view');

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HelmetProvider>
      <AuthProvider>
        <Render />
      </AuthProvider>
    </HelmetProvider>
  </Provider>
);
