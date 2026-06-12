import React, { useState } from 'react';
import AuthView from './components/AuthView';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string>('');

    const handleAuthSuccess = (userData: any, authToken: string) => {
        setUser(userData);
        setToken(authToken);
        setIsAuthenticated(true);
    };

    return (
        <div className="min-h-screen font-sans">
            {!isAuthenticated ? (
                <AuthView onAuthSuccess={handleAuthSuccess} />
            ) : (
                <Dashboard 
                    currentUser={user} 
                    token={token} 
                    onLogout={() => setIsAuthenticated(false)} 
                />
            )}
        </div>
    );
};

export default App;