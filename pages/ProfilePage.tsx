
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserIcon, PhoneIcon, MapPinIcon, FileTextIcon, UploadCloudIcon } from '../components/IconComponents';
import type { User } from '../types';

const ProfilePage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [profileData, setProfileData] = useState<Partial<User>>(user || {});
    const [profilePicPreview, setProfilePicPreview] = useState<string | null>(user?.profilePicUrl || null);
    const [govIdFileName, setGovIdFileName] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData(user);
            setProfilePicPreview(user.profilePicUrl || null);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            if (e.target.name === 'profilePic') {
                setProfilePicPreview(previewUrl);
                // We'll store the blob URL directly in the mock user object
                setProfileData({ ...profileData, profilePicUrl: previewUrl });
            } else if (e.target.name === 'govId') {
                setGovIdFileName(file.name);
                setProfileData({ ...profileData, govIdUrl: previewUrl });
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(profileData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000); // Hide message after 3 seconds
    };
    
    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>
            <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Picture Section */}
                    <div className="md:col-span-1 flex flex-col items-center">
                        <img 
                            src={profilePicPreview || `https://i.pravatar.cc/150?u=${user.email}`} 
                            alt="Profile" 
                            className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                        />
                        <label htmlFor="profilePic" className="cursor-pointer bg-slate-100 text-slate-600 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center space-x-2">
                            <UploadCloudIcon className="w-5 h-5" />
                            <span>Change Picture</span>
                        </label>
                        <input type="file" id="profilePic" name="profilePic" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </div>

                    {/* Profile Details Section */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                            <input type="text" id="name" name="name" value={profileData.name || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
                            <input type="email" id="email" name="email" value={profileData.email || ''} readOnly className="mt-1 block w-full px-3 py-2 bg-slate-100 border border-blue-200 rounded-md shadow-sm cursor-not-allowed" />
                        </div>
                         <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-600 mb-1">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value={profileData.phone || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., +91 98765 43210" />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-slate-600 mb-1">Address</label>
                            <textarea id="address" name="address" value={profileData.address || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="123, Main Street, New Delhi, 110001"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Government ID Proof</label>
                            <label htmlFor="govId" className="cursor-pointer mt-1 flex justify-center w-full px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md hover:border-blue-400 transition-colors">
                                <div className="space-y-1 text-center">
                                    <FileTextIcon className="mx-auto h-12 w-12 text-slate-400" />
                                    <div className="flex text-sm text-slate-600">
                                        <span className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                            <span>Upload a file</span>
                                        </span>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
                                    {govIdFileName && <p className="text-xs text-green-600 font-semibold mt-2">{govIdFileName}</p>}
                                </div>
                            </label>
                             <input type="file" id="govId" name="govId" className="hidden" onChange={handleFileChange} />
                        </div>
                        <div className="flex items-center justify-end space-x-4">
                            {isSaved && <p className="text-sm text-green-600 font-semibold">Profile saved successfully!</p>}
                            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;