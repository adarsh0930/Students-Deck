import React, { useState } from 'react';
import axios from 'axios';
import { processPayloadL1 } from '../utils/cryptoClients';
import { Loader2 } from 'lucide-react';

interface RegisterFormProps { onSuccess: () => void; }

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ fullName: '', email: '', phoneNumber: '', dateOfBirth: '', gender: '', address: '', courseEnrolled: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const encryptedPayload = processPayloadL1(formData, 'encrypt');
            await axios.post('http://localhost:5000/api/register', encryptedPayload);
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm";
    const labelClass = "block text-sm font-medium text-slate-700 mb-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">{error}</div>}
            
            <div>
                <label className={labelClass}>Full Name</label>
                <input required name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Phone</label>
                    <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Date of Birth</label>
                    <input required type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Gender</label>
                    <select required name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div>
                <label className={labelClass}>Course Enrolled</label>
                <input required name="courseEnrolled" value={formData.courseEnrolled} onChange={handleChange} className={inputClass} />
            </div>

            <div>
                <label className={labelClass}>Address</label>
                <textarea required name="address" rows={2} value={formData.address} onChange={handleChange} className={inputClass} />
            </div>

            <div>
                <label className={labelClass}>Secure Password</label>
                <input required type="password" name="password" value={formData.password} onChange={handleChange} className={inputClass} />
            </div>

            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 mt-2 disabled:opacity-70">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
        </form>
    );
};

export default RegisterForm;