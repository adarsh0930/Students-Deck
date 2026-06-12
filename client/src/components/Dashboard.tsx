import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { processPayloadL1 } from '../utils/cryptoClients';
import { LogOut, User, Mail, Phone, Calendar, BookOpen, Trash2 } from 'lucide-react';

interface DashboardProps { currentUser: any; token: string; onLogout: () => void; }

const Dashboard: React.FC<DashboardProps> = ({ currentUser, token, onLogout }) => {
    const [students, setStudents] = useState<any[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const { data } = await axios.get('http://localhost:5000/api/students', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const plaintextStudents = data.map((s: any) => processPayloadL1(s, 'decrypt'));
            setStudents(plaintextStudents);
        };
        fetchStudents();
    }, [token]);

    const handleDeleteAccount = async () => {
        if(window.confirm("Are you sure you want to permanently delete your account?")) {
            await axios.delete(`http://localhost:5000/api/student/${currentUser._id}`);
            onLogout();
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Navigation */}
            <nav className="bg-indigo-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl tracking-tight">Secure Portal</div>
                    <button onClick={onLogout} className="flex items-center gap-2 text-indigo-100 hover:text-white transition-colors text-sm font-medium">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-8 text-center text-white">
                                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold">{currentUser.fullName}</h2>
                                <p className="text-indigo-100 mt-1">{currentUser.courseEnrolled}</p>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Mail className="w-5 h-5 text-indigo-400" />
                                    <span className="text-sm">{currentUser.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Phone className="w-5 h-5 text-indigo-400" />
                                    <span className="text-sm">{currentUser.phoneNumber}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Calendar className="w-5 h-5 text-indigo-400" />
                                    <span className="text-sm">DOB: {currentUser.dateOfBirth}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <BookOpen className="w-5 h-5 text-indigo-400" />
                                    <span className="text-sm">{currentUser.gender}</span>
                                </div>

                                <hr className="border-slate-100 my-6" />

                                <button onClick={handleDeleteAccount} className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold py-2.5 px-4 rounded-xl hover:bg-red-100 transition-colors border border-red-100">
                                    <Trash2 className="w-4 h-4" /> Delete Account
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Directory Table */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-lg font-bold text-slate-800">Student Directory</h3>
                                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                                    {students.length} Users
                                </span>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Full Name</th>
                                            <th className="px-6 py-4 font-semibold">Email Address</th>
                                            <th className="px-6 py-4 font-semibold">Course</th>
                                            <th className="px-6 py-4 font-semibold text-center">Gender</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {students.map((s) => (
                                            <tr key={s._id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-800">{s.fullName}</td>
                                                <td className="px-6 py-4 text-slate-500">{s.email}</td>
                                                <td className="px-6 py-4 text-slate-500">{s.courseEnrolled}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium">
                                                        {s.gender}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;