import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSearch } from '../context/SearchContext';
import type { Flight } from '../types';
import { ArrowRightIcon } from './IconComponents';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const navigate = useNavigate();
  const { setSelectedFlight } = useSearch();

  const handleBookNow = () => {
    setSelectedFlight(flight);
    navigate('/booking');
  };

  return (
    <motion.div 
      layout
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden mb-6">
      <div className="p-6 grid grid-cols-1 md:grid-cols-6 items-center gap-4">
        {/* Airline Info */}
        <div className="md:col-span-1 flex items-center space-x-4">
          <img src={flight.airlineLogo} alt={flight.airline} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold text-slate-800">{flight.airline}</p>
            <p className="text-sm text-slate-500">{flight.flightNumber}</p>
          </div>
        </div>

        {/* Departure */}
        <div className="md:col-span-1 text-center md:text-left">
          <p className="text-xl font-bold text-slate-900">{flight.departureTime}</p>
          <p className="text-sm text-slate-500">{flight.from.code}</p>
        </div>
        
        {/* Duration */}
        <div className="md:col-span-2 flex flex-col items-center">
            <p className="text-sm text-slate-500 mb-1">{flight.duration}</p>
            <div className="w-full flex items-center">
                <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                <div className="flex-grow border-t-2 border-dotted border-slate-300 mx-2"></div>
                <ArrowRightIcon className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500 mt-1">{flight.stops > 0 ? `${flight.stops} Stop(s)` : 'Non-stop'}</p>
        </div>

        {/* Arrival */}
        <div className="md:col-span-1 text-center md:text-right">
          <p className="text-xl font-bold text-slate-900">{flight.arrivalTime}</p>
          <p className="text-sm text-slate-500">{flight.to.code}</p>
        </div>
        
        {/* Price & Booking */}
        <div className="md:col-span-1 flex flex-col items-center md:items-end">
          <p className="text-2xl font-bold text-blue-600 mb-2">₹{flight.price.toLocaleString('en-IN')}</p>
          <button 
            onClick={handleBookNow}
            className="w-full md:w-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;