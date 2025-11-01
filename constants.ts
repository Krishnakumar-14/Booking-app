
import type { Airport, Flight, UserBooking } from './types';

export const airports: Airport[] = [
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai' },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru' },
  { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai' },
  { code: 'CCU', name: 'Netaji Subhas Chandra Bose International Airport', city: 'Kolkata' },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad' },
  { code: 'GOI', name: 'Dabolim Airport', city: 'Goa' },
  { code: 'JAI', name: 'Jaipur International Airport', city: 'Jaipur' },
  { code: 'AMD', name: 'Sardar Vallabhbhai Patel International Airport', city: 'Ahmedabad' },
  { code: 'PNQ', name: 'Pune Airport', city: 'Pune' },
];

export const flights: Flight[] = [
  {
    id: 'AI202',
    airline: 'Air India',
    airlineLogo: 'https://picsum.photos/seed/airindia/40/40',
    flightNumber: 'AI-202',
    from: airports[0], // DEL
    to: airports[1], // BOM
    departureTime: '08:00',
    arrivalTime: '10:15',
    duration: '2h 15m',
    price: 4500,
    stops: 0,
  },
  {
    id: '6E555',
    airline: 'IndiGo',
    airlineLogo: 'https://picsum.photos/seed/indigo/40/40',
    flightNumber: '6E-555',
    from: airports[0], // DEL
    to: airports[1], // BOM
    departureTime: '09:30',
    arrivalTime: '11:40',
    duration: '2h 10m',
    price: 4800,
    stops: 0,
  },
  {
    id: 'UK991',
    airline: 'Vistara',
    airlineLogo: 'https://picsum.photos/seed/vistara/40/40',
    flightNumber: 'UK-991',
    from: airports[0], // DEL
    to: airports[1], // BOM
    departureTime: '12:00',
    arrivalTime: '14:20',
    duration: '2h 20m',
    price: 5200,
    stops: 0,
  },
  {
    id: 'SG101',
    airline: 'SpiceJet',
    airlineLogo: 'https://picsum.photos/seed/spicejet/40/40',
    flightNumber: 'SG-101',
    from: airports[2], // BLR
    to: airports[3], // MAA
    departureTime: '07:00',
    arrivalTime: '08:00',
    duration: '1h 00m',
    price: 2800,
    stops: 0,
  },
  {
    id: 'AI505',
    airline: 'Air India',
    airlineLogo: 'https://picsum.photos/seed/airindia/40/40',
    flightNumber: 'AI-505',
    from: airports[2], // BLR
    to: airports[3], // MAA
    departureTime: '15:00',
    arrivalTime: '16:10',
    duration: '1h 10m',
    price: 3100,
    stops: 0,
  },
  {
    id: '6E2024',
    airline: 'IndiGo',
    airlineLogo: 'https://picsum.photos/seed/indigo/40/40',
    flightNumber: '6E-2024',
    from: airports[1], // BOM
    to: airports[6], // GOI
    departureTime: '11:00',
    arrivalTime: '12:15',
    duration: '1h 15m',
    price: 3500,
    stops: 0,
  },
  {
    id: 'UK847',
    airline: 'Vistara',
    airlineLogo: 'https://picsum.photos/seed/vistara/40/40',
    flightNumber: 'UK-847',
    from: airports[1], // BOM
    to: airports[6], // GOI
    departureTime: '14:30',
    arrivalTime: '15:50',
    duration: '1h 20m',
    price: 3850,
    stops: 0,
  },
    {
    id: 'AI763',
    airline: 'Air India',
    airlineLogo: 'https://picsum.photos/seed/airindia/40/40',
    flightNumber: 'AI-763',
    from: airports[4], // CCU
    to: airports[0], // DEL
    departureTime: '18:00',
    arrivalTime: '20:25',
    duration: '2h 25m',
    price: 5800,
    stops: 0,
  },
  {
    id: '6E123',
    airline: 'IndiGo',
    airlineLogo: 'https://picsum.photos/seed/indigo/40/40',
    flightNumber: '6E-123',
    from: airports[5], // HYD
    to: airports[2], // BLR
    departureTime: '20:00',
    arrivalTime: '21:10',
    duration: '1h 10m',
    price: 3200,
    stops: 0,
  },
   {
    id: 'SG456',
    airline: 'SpiceJet',
    airlineLogo: 'https://picsum.photos/seed/spicejet/40/40',
    flightNumber: 'SG-456',
    from: airports[7], // JAI
    to: airports[1], // BOM
    departureTime: '06:30',
    arrivalTime: '08:10',
    duration: '1h 40m',
    price: 4100,
    stops: 0,
  },
];

export const userBookings: UserBooking[] = [
    {
        id: 'FEA1B2',
        bookingDate: '2024-08-15',
        flight: flights[0],
        passengers: [{ firstName: 'Krishna', lastName: 'Kumar', age: 28 }],
        totalPrice: 4500 * 1.18,
        status: 'Upcoming'
    },
    {
        id: 'FEC3D4',
        bookingDate: '2024-07-10',
        flight: flights[3],
        passengers: [{ firstName: 'Krishna', lastName: 'Kumar', age: 28 }],
        totalPrice: 2800 * 1.18,
        status: 'Completed'
    },
    {
        id: 'FEE5F6',
        bookingDate: '2024-06-20',
        flight: flights[5],
        passengers: [
            { firstName: 'Krishna', lastName: 'Kumar', age: 28 },
            { firstName: 'Rohan', lastName: 'Mehta', age: 29 }
        ],
        totalPrice: (3500 * 2) * 1.18,
        status: 'Upcoming'
    },
    {
        id: 'FEG7H8',
        bookingDate: '2024-05-01',
        flight: flights[7],
        passengers: [{ firstName: 'Krishna', lastName: 'Kumar', age: 28 }],
        totalPrice: 5800 * 1.18,
        status: 'Cancelled'
    }
];