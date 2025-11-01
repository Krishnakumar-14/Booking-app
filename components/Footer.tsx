
import React from 'react';
import { Link } from 'react-router-dom';
import { PlaneIcon, FacebookIcon, TwitterIcon, InstagramIcon } from './IconComponents';

const Footer: React.FC = () => {
  const handlePlaceholderClick = () => {
    alert('Feature coming soon!');
  };

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white mb-4">
                <PlaneIcon className="w-8 h-8 transform -rotate-45 text-blue-400" />
                <span>FlightEase</span>
            </Link>
            <p className="text-slate-400">Your seamless journey starts here. Book flights across India with ease.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-400 hover:text-white">Home</Link></li>
              <li><button onClick={handlePlaceholderClick} className="text-slate-400 hover:text-white text-left">About Us</button></li>
              <li><button onClick={handlePlaceholderClick} className="text-slate-400 hover:text-white text-left">Contact</button></li>
              <li><button onClick={handlePlaceholderClick} className="text-slate-400 hover:text-white text-left">FAQs</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><button onClick={handlePlaceholderClick} className="text-slate-400 hover:text-white text-left">Help Center</button></li>
              <li><button onClick={handlePlaceholderClick} className="text-slate-400 hover:text-white text-left">Terms of Service</button></li>
              <li><button onClick={handlePlaceholderClick} className="text-slate-400 hover:text-white text-left">Privacy Policy</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" onClick={handlePlaceholderClick} title="Facebook" className="text-slate-400 hover:text-blue-500 transition-colors"><FacebookIcon className="w-6 h-6" /></a>
              <a href="#" onClick={handlePlaceholderClick} title="Twitter" className="text-slate-400 hover:text-sky-400 transition-colors"><TwitterIcon className="w-6 h-6" /></a>
              <a href="#" onClick={handlePlaceholderClick} title="Instagram" className="text-slate-400 hover:text-pink-500 transition-colors"><InstagramIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-slate-700 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} FlightEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;