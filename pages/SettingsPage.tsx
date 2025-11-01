
import React, { useState } from 'react';
import { LockIcon, BellIcon } from '../components/IconComponents';

const SettingsPage: React.FC = () => {
    const [notifications, setNotifications] = useState({
        promotions: true,
        updates: true,
    });
    const [passwordSaved, setPasswordSaved] = useState(false);

    const handleToggle = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordSaved(true);
        setTimeout(() => setPasswordSaved(false), 3000);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Settings</h1>
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Change Password Card */}
                <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <LockIcon className="w-6 h-6 mr-3 text-blue-600" />
                        Change Password
                    </h2>
                    <form onSubmit={handlePasswordSubmit}>
                        {passwordSaved && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                                <strong className="font-bold">Success!</strong>
                                <span className="block sm:inline"> Your password has been updated.</span>
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="current-password"
                                       className="block text-sm font-medium text-slate-600 mb-1">Current Password</label>
                                <input type="password" id="current-password" required
                                       className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                       placeholder="••••••••"/>
                            </div>
                            <div>
                                <label htmlFor="new-password"
                                       className="block text-sm font-medium text-slate-600 mb-1">New Password</label>
                                <input type="password" id="new-password" required
                                       className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                       placeholder="••••••••"/>
                            </div>
                             <div>
                                <label htmlFor="confirm-password"
                                       className="block text-sm font-medium text-slate-600 mb-1">Confirm New Password</label>
                                <input type="password" id="confirm-password" required
                                       className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                       placeholder="••••••••"/>
                            </div>
                        </div>
                        <div className="mt-6 text-right">
                             <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                {/* Notification Settings Card */}
                <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
                     <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <BellIcon className="w-6 h-6 mr-3 text-blue-600" />
                        Notification Preferences
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
                            <div>
                                <h3 className="font-semibold text-slate-800">Promotional Emails</h3>
                                <p className="text-sm text-slate-500">Receive updates on offers and new destinations.</p>
                            </div>
                            <button onClick={() => handleToggle('promotions')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.promotions ? 'bg-blue-600' : 'bg-slate-300'}`}>
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.promotions ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
                             <div>
                                <h3 className="font-semibold text-slate-800">Booking Updates</h3>
                                <p className="text-sm text-slate-500">Get alerts about your flight status and check-in.</p>
                            </div>
                           <button onClick={() => handleToggle('updates')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.updates ? 'bg-blue-600' : 'bg-slate-300'}`}>
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.updates ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
