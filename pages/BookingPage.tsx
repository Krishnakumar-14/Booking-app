
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import type { Passenger } from '../types';
import { ArrowRightIcon, PlaneIcon } from '../components/IconComponents';

const BookingPage: React.FC = () => {
  const { selectedFlight, passengers, setPassengers } = useSearch();
  const navigate = useNavigate();
  
  const [localPassengers, setLocalPassengers] = useState<Passenger[]>(passengers);

  useEffect(() => {
    if (!selectedFlight) {
      navigate('/');
    }
  }, [selectedFlight, navigate]);

  useEffect(() => {
    // Sync local state if context changes (e.g., user navigates back and changes passenger count)
    setLocalPassengers(passengers);
  }, [passengers]);
  
  const handlePassengerChange = (index: number, field: keyof Passenger, value: string | number) => {
    const updatedPassengers = [...localPassengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setLocalPassengers(updatedPassengers);
  };
  
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setPassengers(localPassengers);
    navigate('/confirmation');
  };

  if (!selectedFlight) {
    return null; // Or a loading spinner while redirecting
  }

  const passengerCount = localPassengers.length;
  const baseFare = selectedFlight.price * passengerCount;
  const taxes = baseFare * 0.18;
  const totalFare = baseFare + taxes;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Passenger Details</h1>
        <form onSubmit={handleContinue} className="bg-blue-50 p-8 rounded-lg shadow-md">
            {localPassengers.map((passenger, index) => (
                <div key={index} className="mb-6 border-b pb-6">
                    <h2 className="text-xl font-semibold mb-4">Passenger {index + 1}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={`firstName-${index}`} className="block text-sm font-medium text-slate-700">First Name</label>
                            <input type="text" id={`firstName-${index}`} value={passenger.firstName} onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                         <div>
                            <label htmlFor={`lastName-${index}`} className="block text-sm font-medium text-slate-700">Last Name</label>
                            <input type="text" id={`lastName-${index}`} value={passenger.lastName} onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor={`age-${index}`} className="block text-sm font-medium text-slate-700">Age</label>
                            <input type="number" id={`age-${index}`} value={passenger.age || ''} onChange={(e) => handlePassengerChange(index, 'age', parseInt(e.target.value, 10))} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required min="1" />
                        </div>
                    </div>
                </div>
            ))}
             <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                Proceed to Confirmation
            </button>
        </form>
      </div>

      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold mb-6">Fare Summary</h2>
        <div className="bg-blue-50 p-6 rounded-lg shadow-md sticky top-28">
          <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                      <img src={selectedFlight.airlineLogo} alt={selectedFlight.airline} className="w-8 h-8 rounded-full" />
                      <span className="font-semibold">{selectedFlight.airline}</span>
                  </div>
                  <span className="text-sm text-slate-500">{selectedFlight.flightNumber}</span>
              </div>
              <div className="flex justify-between items-center text-slate-800">
                  <div className="text-center">
                      <p className="font-bold text-lg">{selectedFlight.from.code}</p>
                      <p className="text-sm">{selectedFlight.departureTime}</p>
                  </div>
                  <div className="flex items-center text-slate-400">
                     <PlaneIcon className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                      <p className="font-bold text-lg">{selectedFlight.to.code}</p>
                      <p className="text-sm">{selectedFlight.arrivalTime}</p>
                  </div>
              </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Base Fare ({passengerCount} Adult{passengerCount > 1 ? 's' : ''})</span>
              <span>₹{baseFare.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Taxes & Surcharges</span>
              <span>₹{taxes.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t">
              <span>Total Amount</span>
              <span>₹{totalFare.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
