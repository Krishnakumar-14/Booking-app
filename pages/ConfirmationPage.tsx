import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSearch } from '../context/SearchContext';
import { generateTravelGuide } from '../services/geminiService';
import Spinner from '../components/Spinner';

const ConfirmationPage: React.FC = () => {
  const { selectedFlight, passengers } = useSearch();
  const navigate = useNavigate();
  const [travelGuide, setTravelGuide] = useState('');
  const [isLoadingGuide, setIsLoadingGuide] = useState(true);

  useEffect(() => {
    if (!selectedFlight || passengers.length === 0 || !passengers[0].firstName) {
      navigate('/');
    } else {
        const fetchGuide = async () => {
            setIsLoadingGuide(true);
            const guide = await generateTravelGuide(selectedFlight.to.city);
            setTravelGuide(guide);
            setIsLoadingGuide(false);
        };
        fetchGuide();
    }
  }, [selectedFlight, passengers, navigate]);

  if (!selectedFlight || passengers.length === 0 || !passengers[0].firstName) {
    return null;
  }

  const bookingId = `FE${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-50 p-8 md:p-12 rounded-lg shadow-lg text-center"
      >
        <motion.svg 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </motion.svg>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-slate-800"
        >
          Booking Confirmed!
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-slate-600 mt-2"
        >
          Your flight to {selectedFlight.to.city} is booked. Your booking ID is <span className="font-semibold text-slate-800">{bookingId}</span>.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="my-8 text-left border-t border-b py-6"
        >
            <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold text-2xl">{selectedFlight.from.code} → {selectedFlight.to.code}</p>
                    <p className="text-slate-500">{selectedFlight.airline} - {selectedFlight.flightNumber}</p>
                </div>
                <div>
                    <p className="font-bold text-2xl">{selectedFlight.departureTime}</p>
                    <p className="text-slate-500">Departure</p>
                </div>
            </div>
        </motion.div>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 1.0 }}
           className="mb-8 text-left"
        >
            <h2 className="text-xl font-semibold mb-4">Passenger(s)</h2>
            <ul className="list-disc list-inside text-slate-700">
                {passengers.map((p, i) => <li key={i}>{p.firstName} {p.lastName}</li>)}
            </ul>
        </motion.div>
        
        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 1.2 }}
           className="bg-blue-50 p-6 rounded-lg text-left"
        >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Your Mini Guide to {selectedFlight.to.city}</h3>
            {isLoadingGuide ? <div className="flex justify-center"><Spinner /></div> : <p className="text-blue-700">{travelGuide}</p>}
        </motion.div>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 1.4 }}
        >
            <Link to="/" className="mt-8 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Book Another Flight
            </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;