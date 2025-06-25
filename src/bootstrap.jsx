import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider, MockAuthProvider } from '@mtbs/shared-lib';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

if (process.env.NODE_ENV === 'development' && process.env.MOCK_API === 'true') {
    import('@mtbs/shared-lib/mocks').then(({ worker }) => worker.start());
}

// Choose mock or real auth
const Provider = process.env.MOCK_AUTH === 'true' ? MockAuthProvider : AuthProvider;

// 👉 Check if running standalone
const isStandalone = window.location.port === '3001'; // <-- app-auth port

const Wrapper = ({ children }) => (
    isStandalone ? <BrowserRouter>{children}</BrowserRouter> : <>{children}</>
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider>
            <Wrapper>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </Wrapper>
        </Provider>
    </React.StrictMode>
);