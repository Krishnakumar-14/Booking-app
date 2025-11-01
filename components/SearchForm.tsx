import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { airports } from '../constants';
import { PlaneIcon, CalendarIcon, UsersIcon } from './IconComponents';
import type { Airport } from '../types';

const SearchForm: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState(1);
  
  const navigate = useNavigate();
  const { setSearchCriteria } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      const criteria = { from, to, date, passengers };
      setSearchCriteria(criteria);
      navigate('/search');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="bg-blue-50 p-6 md:p-8 rounded-xl shadow-2xl relative z-10 -mt-24 max-w-5xl mx-auto">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="w-full">
            <label htmlFor="from" className="block text-sm font-medium text-slate-500 mb-1">From</label>
            <div className="relative">
              <PlaneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
              <input 
                id="from"
                type="text"
                list="airports-from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Departure City (e.g., DEL)"
                className="w-full pl-10 pr-3 py-2 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <datalist id="airports-from">
                {airports.map((airport: Airport) => (
                  <option key={airport.code} value={airport.code}>{`${airport.city} (${airport.code})`}</option>
                ))}
              </datalist>
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="to" className="block text-sm font-medium text-slate-500 mb-1">To</label>
            <div className="relative">
              <PlaneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90"/>
              <input 
                id="to"
                type="text"
                list="airports-to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Arrival City (e.g., BOM)"
                className="w-full pl-10 pr-3 py-2 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <datalist id="airports-to">
                {airports.map((airport: Airport) => (
                  <option key={airport.code} value={airport.code}>{`${airport.city} (${airport.code})`}</option>
                ))}
              </datalist>
            </div>
          </div>
          
          <div className="w-full">
             <label htmlFor="date" className="block text-sm font-medium text-slate-500 mb-1">Departure Date</label>
             <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-3 py-2 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
             </div>
          </div>
          
          <div className="w-full">
            <label htmlFor="passengers" className="block text-sm font-medium text-slate-500 mb-1">Passengers</label>
            <div className="relative">
                <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
                <input
                    id="passengers"
                    type="number"
                    value={passengers}
                    onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    min="1"
                    className="w-full pl-10 pr-3 py-2 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors h-[42px] flex items-center justify-center">
            Search Flights
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
