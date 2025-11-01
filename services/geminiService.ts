import { GoogleGenAI, Type } from "@google/genai";
import type { SearchCriteria, Flight } from '../types';
import { airports } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateTrendingDestinations = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a curated list of 5 sought-after domestic travel destinations within India, specifically tailored for a discerning young adult audience. For each location, craft an evocative title, a captivating and sophisticated narrative (limited to 2-3 sentences) that paints a vivid picture of the experience, and a unique placeholder image URL from picsum.photos using a distinct seed for each.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              imageUrl: { type: Type.STRING }
            }
          }
        }
      }
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Error generating trending destinations:", error);
    // Return a fallback array in case of an API error
    return [
        { title: 'Goa', description: 'Sun, sand, and sea. Experience the vibrant nightlife and serene beaches.', imageUrl: 'https://picsum.photos/seed/goa/400/300' },
        { title: 'Jaipur', description: 'Explore the Pink City\'s majestic forts, palaces, and rich history.', imageUrl: 'https://picsum.photos/seed/jaipur/400/300' },
        { title: 'Manali', description: 'A paradise for mountain lovers, offering breathtaking views and adventure sports.', imageUrl: 'https://picsum.photos/seed/manali/400/300' },
    ];
  }
};


export const generateTravelGuide = async (city: string) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create a mini travel guide for ${city}, India. It should be a single paragraph, friendly and exciting, highlighting 2-3 must-do activities. Keep it concise and under 100 words.`
        });
        return response.text;
    } catch (error) {
        console.error(`Error generating travel guide for ${city}:`, error);
        return `Welcome to ${city}! Get ready to explore its unique culture and attractions. From historical landmarks to delicious local cuisine, there's something for everyone to enjoy on this memorable trip.`;
    }
}

export const searchFlights = async (criteria: SearchCriteria): Promise<Flight[]> => {
    const fromAirport = airports.find(a => a.code === criteria.from);
    const toAirport = airports.find(a => a.code === criteria.to);

    if (!fromAirport || !toAirport) {
        console.error("Invalid airport codes provided.");
        return [];
    }
    
    const prompt = `
        You are a flight booking API. Your task is to find and generate a list of available flights based on user criteria.
        
        Search Criteria:
        - Departure City: ${fromAirport.city} (${fromAirport.code})
        - Arrival City: ${toAirport.city} (${toAirport.code})
        - Date: ${criteria.date}
        
        Instructions:
        1. Generate a realistic list of 5 to 8 flights for the specified route and date.
        2. Include a mix of major Indian airlines such as Air India, IndiGo, Vistara, and SpiceJet.
        3. Ensure flight details (flight numbers, departure/arrival times, duration, price) are plausible and varied for the given route.
        4. For airline logos, generate a unique placeholder image URL from picsum.photos using a distinct seed for each airline (e.g., https://picsum.photos/seed/airindia/40/40).
        5. The flight 'id' must be a unique string, combining a short airline code and the flight number (e.g., 'AI202').
        6. The 'from' and 'to' objects must exactly match the provided airport details.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            airline: { type: Type.STRING },
                            airlineLogo: { type: Type.STRING },
                            flightNumber: { type: Type.STRING },
                            from: {
                                type: Type.OBJECT,
                                properties: {
                                    code: { type: Type.STRING },
                                    name: { type: Type.STRING },
                                    city: { type: Type.STRING },
                                },
                                required: ["code", "name", "city"]
                            },
                            to: {
                                type: Type.OBJECT,
                                properties: {
                                    code: { type: Type.STRING },
                                    name: { type: Type.STRING },
                                    city: { type: Type.STRING },
                                },
                                required: ["code", "name", "city"]
                            },
                            departureTime: { type: Type.STRING },
                            arrivalTime: { type: Type.STRING },
                            duration: { type: Type.STRING },
                            price: { type: Type.NUMBER },
                            stops: { type: Type.INTEGER },
                        },
                         required: ["id", "airline", "airlineLogo", "flightNumber", "from", "to", "departureTime", "arrivalTime", "duration", "price", "stops"]
                    }
                }
            }
        });
        
        const jsonString = response.text.trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error searching for flights:", error);
        return []; // Return an empty array on error
    }
};
