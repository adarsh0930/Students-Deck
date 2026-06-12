import React, { useState } from 'react';
import axios from 'axios';
import { processPayloadL1 } from '../utils/cryptoClients';
import { Loader2 } from 'lucide-react';

interface LoginFormProps { onSuccess: (user: any, token: string) => void; }

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const encryptedPayload = processPayloadL1(credentials, 'encrypt');
            const response = await axios.post('http://localhost:5000/api/login', encryptedPayload);
            onSuccess(response.data.user, response.data.token);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <h3 className="text-2xl font-bold text-slate-800">Welcome back</h3>
                <p className="text-slate-500 text-sm mt-1">Enter your details to access your dashboard.</p>
            </div>

            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">{error}</div>}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input required type="email" name="email" value={credentials.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="you@example.com" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input required type="password" name="password" value={credentials.password} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="••••••••" />
                </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 mt-6 disabled:opacity-70">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In Securely'}
            </button>
        </form>
    );
};

export default LoginForm;