
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlaneIcon, UserCircleIcon, LogOutIcon, UserIcon, SettingsIcon } from './IconComponents';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }

  return (
    <header className="bg-blue-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
            <PlaneIcon className="w-8 h-8 transform -rotate-45" />
            <span>FlightEase</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/my-bookings" className="text-slate-600 hover:text-blue-600 transition-colors">My Bookings</Link>
            <Link to="/support" className="text-slate-600 hover:text-blue-600 transition-colors">Support</Link>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors">
                <img src={user?.profilePicUrl || `https://i.pravatar.cc/150?u=${user?.email}`} alt="profile" className="w-8 h-8 rounded-full" />
                <span>{user?.name}</span>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-50 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 text-sm text-slate-700 border-b">
                    <p className="font-semibold">Signed in as</p>
                    <p className="truncate">{user?.email}</p>
                  </div>
                  <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    <UserIcon className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    <SettingsIcon className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOutIcon className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/my-bookings" className="text-slate-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>My Bookings</Link>
              <Link to="/support" className="text-slate-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Support</Link>
              <div className="border-t pt-4 mt-2">
                <div className="flex items-center space-x-3 mb-3">
                  <img src={user?.profilePicUrl || `https://i.pravatar.cc/150?u=${user?.email}`} alt="profile" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-slate-800">{user?.name}</p>
                    <p className="text-sm text-slate-500">{user?.email}</p>
                  </div>
                </div>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md">
                    <UserIcon className="w-5 h-5" />
                    <span>My Profile</span>
                </Link>
                 <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md">
                    <SettingsIcon className="w-5 h-5" />
                    <span>Settings</span>
                </Link>
                <button onClick={handleLogout} className="w-full mt-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors font-medium flex items-center justify-center space-x-2">
                  <LogOutIcon className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;