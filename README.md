
# ✈️ FlightEase – Flight Booking Web App (India)

## 🧩 Overview
**FlightEase** is a modern, responsive **Flight Booking Web Application** built using **React.js (JavaScript)**.  
It allows users to search, compare, and book flights within India easily and securely.  
This project focuses on creating a smooth frontend experience using dummy data and reusable UI components.

---

## 🚀 Features
- 🔍 Search and filter flights by city, date, and class  
- 🧾 View detailed flight information  
- 🧍 Passenger detail form before booking  
- 💳 Simulated payment process with confirmation  
- 🧾 Booking confirmation page with PNR  
- 👤 User dashboard to view booking history  
- 🔐 User login & registration pages  
- ☎️ Support form for user issues  
- 📊 Optional admin panel to manage flights  

---

## 🧱 Tech Stack
| Category | Technology |
|-----------|-------------|
| **Frontend** | React.js, JavaScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | React Icons / Lucide React |
| **Routing** | React Router DOM |
| **State Management** | React Context API |
| **API Calls (Optional)** | Axios |

---

## 🗂️ Folder Structure
```

src/
├── assets/               # images, logos, icons
├── components/           # reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── FlightCard.jsx
│   ├── SearchBox.jsx
│   ├── PassengerForm.jsx
│   ├── PaymentCard.jsx
│   ├── BookingCard.jsx
│   ├── Button.jsx
│   └── InputField.jsx
│
├── pages/                # main pages
│   ├── Home.jsx
│   ├── SearchResults.jsx
│   ├── FlightDetails.jsx
│   ├── Booking.jsx
│   ├── Payment.jsx
│   ├── Confirmation.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Support.jsx
│   ├── About.jsx
│   └── NotFound.jsx
│
├── layouts/              # layout components
│   ├── MainLayout.jsx
│   └── AdminLayout.jsx
│
├── data/                 # dummy JSON data files
│   ├── flights.json
│   ├── bookings.json
│   ├── users.json
│   ├── confirmation.json
│   └── destinations.json
│
├── context/              # global state management
│   ├── SearchContext.js
│   ├── UserContext.js
│   └── BookingContext.js
│
├── styles/
│   ├── index.css
│   └── tailwind.css
│
├── App.js                # app routes setup
├── index.js              # app entry point
└── README.md

````

---

## 🧭 Page Flow

### 🏠 1. Home Page (`/`)
- Search bar for flight queries  
- Trending destinations and offers  
- Dummy data: `destinations.json`

### ✈️ 2. Search Results Page (`/search`)
- Shows flights matching search criteria  
- Filters for price, airline, and duration  
- Dummy data: `flights.json`

### 📋 3. Flight Details Page (`/flight/:id`)
- Displays selected flight details  
- “Book Now” → Redirects to booking form  
- Dummy data: single flight object

### 🧍 4. Booking Page (`/booking`)
- Passenger form + fare summary  
- Dummy data: `bookings.json`

### 💳 5. Payment Page (`/payment`)
- Payment method options (UPI, Card, Netbanking)  
- “Pay Now” → Redirect to confirmation  
- Dummy data: payment info

### ✅ 6. Confirmation Page (`/confirmation`)
- Displays booking ID, flight, and payment status  
- Dummy data: `confirmation.json`

### 👤 7. User Dashboard (`/dashboard`)
- List of user bookings  
- Upcoming / completed trips  
- Dummy data: `bookings.json`

### 🔐 8. Login / Register (`/login`, `/register`)
- Authentication pages (with localStorage for now)  
- Dummy credentials:
  ```json
  {
    "email": "krishna@gmail.com",
    "password": "password123"
  }
````

### ☎️ 9. Support Page (`/support`)

* Contact form + ticket status
* Dummy data: support tickets

### ℹ️ 10. About Page (`/about`)

* App description + team information

### 🚫 11. 404 Page (`*`)

* Shown for invalid URLs
* “Back to Home” button

---

## 🧪 Dummy Data Example

**flights.json**

```json
[
  {
    "id": 1,
    "flightNumber": "AI-202",
    "airline": "Air India",
    "from": "Chennai",
    "to": "Delhi",
    "departure": "2025-11-02T09:00",
    "arrival": "2025-11-02T11:45",
    "price": 5500,
    "duration": "2h 45m"
  },
  {
    "id": 2,
    "flightNumber": "6E-421",
    "airline": "IndiGo",
    "from": "Chennai",
    "to": "Delhi",
    "departure": "2025-11-02T13:00",
    "arrival": "2025-11-02T15:45",
    "price": 4800,
    "duration": "2h 45m"
  }
]
```

**confirmation.json**

```json
{
  "bookingId": "BKG20251102",
  "flightNumber": "AI-202",
  "status": "Confirmed",
  "pnr": "PNR5482"
}





## ⚒️ Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm start`     | Start development server |
| `npm run build` | Create production build  |
| `npm run test`  | Run tests (optional)     |



## 🧠 Future Enhancements

* 🌐 Connect with real flight APIs (Amadeus, Skyscanner)
* 🌙 Dark mode support
* 📱 Progressive Web App (PWA)
* 🧾 Email-based ticket sending
* 🧭 Real-time flight tracking


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
