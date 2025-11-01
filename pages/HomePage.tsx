
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Fix: Import Variants type from framer-motion
import { motion, Variants } from 'framer-motion';
import SearchForm from '../components/SearchForm';
import { generateTrendingDestinations } from '../services/geminiService';
import Spinner from '../components/Spinner';
import { useSearch } from '../context/SearchContext';
import { airports } from '../constants';


interface Destination {
  title: string;
  description: string;
  imageUrl: string;
  cityCode: string; // Assuming Gemini can provide this
}

// Fix: Explicitly type variants with the Variants type to ensure correct type inference for transition properties.
const destinationsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

// Fix: Explicitly type variants with the Variants type to ensure correct type inference for transition properties.
const destinationItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

const HomePage: React.FC = () => {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setSearchCriteria } = useSearch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDestinations = async () => {
            setIsLoading(true);
            const data = await generateTrendingDestinations();
            setDestinations(data);
            setIsLoading(false);
        };
        fetchDestinations();
    }, []);

    const handleDestinationClick = (destination: Destination) => {
        const toAirport = airports.find(a => a.city.toLowerCase() === destination.title.toLowerCase());
        if (!toAirport) {
            alert(`Could not find airport information for ${destination.title}`);
            return;
        }

        const criteria = {
            from: 'DEL', // Default departure
            to: toAirport.code,
            date: new Date().toISOString().split('T')[0],
            passengers: 1,
        };
        setSearchCriteria(criteria);
        navigate('/search');
    };

  return (
    <div>
      <div className="relative bg-cover bg-center h-96 rounded-lg -mx-4 -mt-8" style={{backgroundImage: `url('https://picsum.photos/seed/travel/1600/600')`}}>
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Find Your Next Adventure
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl"
          >
            Book domestic flights across India at the best prices. Your journey begins here.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        <SearchForm />
      </motion.div>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Trending Destinations</h2>
        {isLoading ? (
            <div className="flex justify-center"><Spinner size="h-12 w-12"/></div>
        ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={destinationsContainerVariants}
              initial="hidden"
              animate="visible"
            >
            {destinations.map((dest, index) => (
                <motion.div 
                    key={index} 
                    className="bg-blue-50 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                    onClick={() => handleDestinationClick(dest)}
                    variants={destinationItemVariants}
                >
                    <img src={dest.imageUrl} alt={dest.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{dest.title}</h3>
                        <p className="text-slate-600">{dest.description}</p>
                    </div>
                </motion.div>
            ))}
            </motion.div>
        )}
        </section>

    </div>
  );
};

export default HomePage;
