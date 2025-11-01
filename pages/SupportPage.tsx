
import React, { useState } from 'react';
import { HelpCircleIcon, MessageSquareIcon, HistoryIcon } from '../components/IconComponents';

const faqs = [
    {
        question: 'How do I cancel my flight booking?',
        answer: 'You can cancel your booking through the "My Bookings" section. Please note that cancellation fees may apply depending on the airline\'s policy.'
    },
    {
        question: 'Can I change the date of my flight?',
        answer: 'Yes, date changes are possible for most bookings. Go to "My Bookings", select your flight, and follow the instructions for rescheduling. Airline charges may apply.'
    },
    {
        question: 'How do I get my boarding pass?',
        answer: 'Your boarding pass will be emailed to you after you complete the web check-in process on the airline\'s website, which is typically available 24-48 hours before departure.'
    },
    {
        question: 'What is the baggage allowance?',
        answer: 'Baggage allowance varies by airline and ticket type. The specific details for your flight will be mentioned on the ticket confirmation email.'
    }
];

const mockTickets = [
    { id: 'TKT721', subject: 'Refund Status', status: 'Closed', date: '2024-07-15' },
    { id: 'TKT812', subject: 'Baggage Query', status: 'In Progress', date: '2024-07-28' }
];


const SupportPage: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Support Center</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Contact Form & History */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Contact Form */}
                    <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
                         <h2 className="text-2xl font-bold mb-6 flex items-center"><MessageSquareIcon className="w-7 h-7 mr-3 text-blue-600" />Contact Us</h2>
                         <form onSubmit={handleSubmit}>
                            {isSubmitted && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                                    <strong className="font-bold">Success!</strong>
                                    <span className="block sm:inline"> Your message has been sent. We'll get back to you shortly.</span>
                                </div>
                            )}
                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-600 mb-1">Subject</label>
                                <input type="text" id="subject" name="subject" required className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Issue with booking ID XXXXXX" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-sm font-medium text-slate-600 mb-1">Message</label>
                                <textarea id="message" name="message" rows={5} required className="mt-1 block w-full px-3 py-2 bg-white border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Please describe your issue in detail..."></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                                Submit Request
                            </button>
                         </form>
                    </div>

                    {/* Ticket History */}
                    <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
                         <h2 className="text-2xl font-bold mb-6 flex items-center"><HistoryIcon className="w-7 h-7 mr-3 text-blue-600" />Your Ticket History</h2>
                         <div className="space-y-4">
                            {mockTickets.map(ticket => (
                                <div key={ticket.id} className="bg-white p-4 rounded-md shadow-sm flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-slate-800">{ticket.subject}</p>
                                        <p className="text-sm text-slate-500">Ticket ID: {ticket.id} | Date: {ticket.date}</p>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${ticket.status === 'Closed' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {ticket.status}
                                    </span>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>

                {/* Right Column: FAQs */}
                <div className="lg:col-span-1">
                     <div className="bg-blue-50 p-8 rounded-lg shadow-lg sticky top-28">
                        <h2 className="text-2xl font-bold mb-6 flex items-center"><HelpCircleIcon className="w-7 h-7 mr-3 text-blue-600" />FAQs</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold text-slate-800">{faq.question}</h3>
                                    <p className="text-slate-600 text-sm mt-1">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
