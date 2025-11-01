import React, { useEffect, useMemo, useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { motion, AnimatePresence } from 'framer-motion';
import { searchFlights } from '../services/geminiService';
import FlightCard from '../components/FlightCard';
import { useNavigate } from 'react-router-dom';
import type { Flight } from '../types';
import Spinner from '../components/Spinner';

// Helper component for Filtering
const FilterSidebar: React.FC<{
  allFlights: Flight[];
  filters: { stops: number[]; airlines: string[] };
  setFilters: React.Dispatch<React.SetStateAction<{ stops: number[]; airlines: string[] }>>;
}> = ({ allFlights, filters, setFilters }) => {
  const airlines = useMemo(() => [...new Set(allFlights.map(f => f.airline))], [allFlights]);
  const stops = useMemo(() => [...new Set(allFlights.map(f => f.stops))].sort(), [allFlights]);

  const handleStopChange = (stop: number) => {
    setFilters(prev => ({
      ...prev,
      stops: prev.stops.includes(stop) ? prev.stops.filter(s => s !== stop) : [...prev.stops, stop],
    }));
  };

  const handleAirlineChange = (airline: string) => {
    setFilters(prev => ({
      ...prev,
      airlines: prev.airlines.includes(airline) ? prev.airlines.filter(a => a !== airline) : [...prev.airlines, airline],
    }));
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md h-fit sticky top-28">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Filter By</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Stops</h3>
        {stops.map(stop => (
          <label key={stop} className="flex items-center space-x-2 text-slate-600 mb-1">
            <input type="checkbox" checked={filters.stops.includes(stop)} onChange={() => handleStopChange(stop)} className="rounded text-blue-600 focus:ring-blue-500"/>
            <span>{stop === 0 ? 'Non-stop' : `${stop} Stop(s)`}</span>
          </label>
        ))}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Airlines</h3>
        {airlines.map(airline => (
          <label key={airline} className="flex items-center space-x-2 text-slate-600 mb-1">
            <input type="checkbox" checked={filters.airlines.includes(airline)} onChange={() => handleAirlineChange(airline)} className="rounded text-blue-600 focus:ring-blue-500"/>
            <span>{airline}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// Helper component for Sorting
const SortBar: React.FC<{ sortKey: string; setSortKey: (key: string) => void }> = ({ sortKey, setSortKey }) => {
  const sortOptions = [
    { key: 'price_asc', label: 'Price: Low to High' },
    { key: 'price_desc', label: 'Price: High to Low' },
    { key: 'duration_asc', label: 'Duration: Shortest' },
  ];
  return (
    <div className="bg-blue-50 p-3 rounded-md shadow-sm mb-6 flex items-center space-x-2">
      <span className="font-semibold text-sm mr-2">Sort by:</span>
      {sortOptions.map(opt => (
        <button
          key={opt.key}
          onClick={() => setSortKey(opt.key)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            sortKey === opt.key
              ? 'bg-blue-600 text-white font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};


const SearchResultsPage: React.FC = () => {
  const { searchCriteria } = useSearch();
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState('price_asc');
  const [filters, setFilters] = useState<{ stops: number[]; airlines: string[] }>({ stops: [], airlines: [] });
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!searchCriteria) {
      navigate('/');
      return;
    }

    const performSearch = async () => {
      setIsLoading(true);
      const results = await searchFlights(searchCriteria);
      setAllFlights(results);
      setIsLoading(false);
    };

    performSearch();
  }, [searchCriteria, navigate]);


  const processedFlights = useMemo(() => {
    let result = [...allFlights];

    // Apply filters
    if (filters.stops.length > 0) {
      result = result.filter(f => filters.stops.includes(f.stops));
    }
    if (filters.airlines.length > 0) {
      result = result.filter(f => filters.airlines.includes(f.airline));
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortKey) {
        case 'price_desc':
          return b.price - a.price;
        case 'duration_asc':
          // A simple duration sort assuming "Xh Ym" format. More robust parsing might be needed.
          return parseInt(a.duration.replace(/\D/g, '')) - parseInt(b.duration.replace(/\D/g, ''));
        case 'price_asc':
        default:
          return a.price - b.price;
      }
    });

    return result;
  }, [allFlights, sortKey, filters]);

  if (!searchCriteria) {
    return null;
  }
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 bg-blue-50 rounded-lg shadow-md">
            <Spinner size="h-16 w-16" />
            <p className="mt-4 text-lg text-slate-600 font-semibold">Finding the best flights for you...</p>
            <p className="text-slate-500">This may take a moment.</p>
        </div>
      );
    }
    
    if (allFlights.length === 0) {
      return (
         <div className="text-center py-16 bg-blue-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">No Flights Found</h2>
            <p className="text-slate-600">We couldn't find any flights for your search. Please try different criteria.</p>
        </div>
      );
    }

    return (
      <>
        <SortBar sortKey={sortKey} setSortKey={setSortKey} />
        <AnimatePresence>
          {processedFlights.length > 0 ? (
            processedFlights.map(flight => <FlightCard key={flight.id} flight={flight} />)
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} 
              className="text-center py-16 bg-blue-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">No Matching Flights</h2>
                <p className="text-slate-600">Try adjusting your filters to find more results.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="bg-blue-600 text-white p-6 rounded-lg mb-8 -mx-4 -mt-8 shadow-lg">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <p className="text-lg opacity-90">
          Flights from <span className="font-semibold">{searchCriteria.from}</span> to <span className="font-semibold">{searchCriteria.to}</span> on {new Date(searchCriteria.date + 'T00:00:00').toDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <FilterSidebar allFlights={allFlights} filters={filters} setFilters={setFilters} />
        </aside>

        <main className="lg:col-span-3">
          {renderContent()}
        </main>
      </div>
    </motion.div>
  );
};

export default SearchResultsPage;
