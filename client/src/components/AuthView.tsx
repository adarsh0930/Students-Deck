import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthView: React.FC<{ onAuthSuccess: (user: any, token: string) => void }> = ({ onAuthSuccess }) => {
    const [view, setView] = useState<'login' | 'register'>('login');
    const [regSuccess, setRegSuccess] = useState(false);

    if (regSuccess) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full border border-slate-100">
                    <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Registration Complete!</h2>
                    <p className="text-slate-500 mb-8">Your secure account has been created successfully.</p>
                    <button 
                        onClick={() => { setRegSuccess(false); setView('login'); }}
                        className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex items-center gap-2 mb-8">
                <ShieldCheck className="w-10 h-10 text-indigo-600" />
                <h1 className="text-3xl font-bold tracking-tight text-slate-800">Secure Portal</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-lg w-full border border-slate-100">
                <div className="flex border-b border-slate-100">
                    <button 
                        onClick={() => setView('login')}
                        className={`flex-1 py-4 text-sm font-semibold transition-colors ${view === 'login' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => setView('register')}
                        className={`flex-1 py-4 text-sm font-semibold transition-colors ${view === 'register' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                        Create Account
                    </button>
                </div>

                <div className="p-8">
                    {view === 'login' ? (
                        <LoginForm onSuccess={onAuthSuccess} />
                    ) : (
                        <RegisterForm onSuccess={() => setRegSuccess(true)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthView;