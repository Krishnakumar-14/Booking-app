
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Flight, SearchCriteria, Passenger } from '../types';

interface SearchContextType {
  searchCriteria: SearchCriteria | null;
  setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteria | null>>;
  searchResults: Flight[];
  setSearchResults: React.Dispatch<React.SetStateAction<Flight[]>>;
  selectedFlight: Flight | null;
  setSelectedFlight: React.Dispatch<React.SetStateAction<Flight | null>>;
  passengers: Passenger[];
  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([{ firstName: '', lastName: '', age: 0 }]);

  useEffect(() => {
    if (searchCriteria && searchCriteria.passengers > 0) {
      const numPassengers = searchCriteria.passengers;
      setPassengers(prevPassengers => {
        const newPassengers = [...prevPassengers];
        if (newPassengers.length < numPassengers) {
          // Add new blank passengers if the count increases
          for (let i = newPassengers.length; i < numPassengers; i++) {
            newPassengers.push({ firstName: '', lastName: '', age: 0 });
          }
        } else if (newPassengers.length > numPassengers) {
          // Remove extra passengers from the end if the count decreases
          newPassengers.length = numPassengers;
        }
        return newPassengers;
      });
    }
  }, [searchCriteria]);


  const value = {
    searchCriteria,
    setSearchCriteria,
    searchResults,
    setSearchResults,
    selectedFlight,
    setSelectedFlight,
    passengers,
    setPassengers,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
