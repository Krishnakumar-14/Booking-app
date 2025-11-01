
export interface Airport {
  code: string;
  name: string;
  city: string;
}

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  from: Airport;
  to: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  age: number;
}

export interface SearchCriteria {
  from: string;
  to: string;
  date: string;
  passengers: number;
}

export interface Booking {
  flight: Flight;
  passengers: Passenger[];
  bookingId: string;
}

export interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  govIdUrl?: string;
  profilePicUrl?: string;
}

export interface UserBooking {
  id: string;
  bookingDate: string;
  flight: Flight;
  passengers: Passenger[];
  totalPrice: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}