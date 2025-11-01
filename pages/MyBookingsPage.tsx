import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { userBookings } from '../constants';
import type { UserBooking } from '../types';
import { TicketIcon, UsersIcon, PlaneIcon } from '../components/IconComponents';

type BookingStatus = 'Upcoming' | 'Completed' | 'Cancelled';

const StatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
    const statusStyles = {
        Upcoming: 'bg-blue-100 text-blue-800',
        Completed: 'bg-green-100 text-green-800',
        Cancelled: 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
            {status}
        </span>
    );
};

const BookingCard: React.FC<{ booking: UserBooking }> = ({ booking }) => {
    const { flight } = booking;
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden mb-6"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm text-slate-500">Booking ID: <span className="font-semibold text-slate-700">{booking.id}</span></p>
                        <p className="text-sm text-slate-500">Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                    <StatusBadge status={booking.status} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 border-t pt-4">
                    {/* Airline Info */}
                    <div className="md:col-span-1 flex items-center space-x-4">
                        <img src={flight.airlineLogo} alt={flight.airline} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold text-slate-800">{flight.airline}</p>
                            <p className="text-sm text-slate-500">{flight.flightNumber}</p>
                        </div>
                    </div>

                    {/* Route */}
                    <div className="md:col-span-2 flex items-center justify-center text-slate-800">
                        <div className="text-center">
                            <p className="font-bold text-xl">{flight.from.code}</p>
                            <p className="text-sm">{flight.departureTime}</p>
                        </div>
                        <div className="flex-grow flex items-center mx-4">
                            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                            <div className="flex-grow border-t-2 border-dotted border-slate-300"></div>
                            <PlaneIcon className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-xl">{flight.to.code}</p>
                            <p className="text-sm">{flight.arrivalTime}</p>
                        </div>
                    </div>
                    
                    {/* Passengers */}
                    <div className="md:col-span-1 flex items-center space-x-2 text-slate-600 justify-center">
                        <UsersIcon className="w-5 h-5" />
                        <span>{booking.passengers.length} Passenger(s)</span>
                    </div>

                    {/* Total Price */}
                    <div className="md:col-span-1 text-center md:text-right">
                         <p className="text-lg font-bold text-blue-600">₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                         <p className="text-sm text-slate-500">Total Fare</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const MyBookingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<BookingStatus>('Upcoming');

    const filteredBookings = useMemo(() => {
        return userBookings.filter(b => b.status === activeTab);
    }, [activeTab]);

    const tabs: BookingStatus[] = ['Upcoming', 'Completed', 'Cancelled'];

    return (
        <div>
            <div className="flex items-center mb-8">
                <TicketIcon className="w-8 h-8 mr-3 text-blue-600"/>
                <h1 className="text-3xl font-bold">My Bookings</h1>
            </div>

            <div className="mb-6 border-b border-slate-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                                activeTab === tab
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blue-600" layoutId="underline" />
                            )}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
                        ) : (
                            <div className="text-center py-16 bg-blue-50 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-2">No {activeTab.toLowerCase()} bookings</h2>
                                <p className="text-slate-600">You currently have no {activeTab.toLowerCase()} flights in your account.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MyBookingsPage;