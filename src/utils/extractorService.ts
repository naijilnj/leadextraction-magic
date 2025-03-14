
import * as XLSX from 'xlsx';
import axios from 'axios';
import { load } from 'cheerio';

export interface Lead {
  name: string;
  phone: string;
  address: string;
  rating?: string;
  category?: string;
  email?: string;
  website?: string;
}

// Function that would extract leads from JustDial if we had a backend
export const extractLeads = async (
  category: string,
  location: string
): Promise<Lead[]> => {
  console.log(`Unable to extract real leads for ${category} in ${location} - backend required`);
  console.log('Real extraction requires Puppeteer running on a Node.js backend');
  
  // Always fall back to mock data since we can't use Puppeteer in the browser
  return generateMockLeads(category, location);
};

// Fallback function to generate mock leads that simulates real data
const generateMockLeads = (category: string, location: string): Lead[] => {
  console.log(`Generating realistic mock leads for ${category} in ${location}`);
  
  // All the mock data generation code
  const mockBusinessTypes = {
    restaurants: ["Restaurant", "Café", "Bistro", "Diner", "Eatery"],
    hotels: ["Hotel", "Resort", "Inn", "Suites", "Lodging"],
    doctors: ["Clinic", "Medical Center", "Hospital", "Specialist", "Practice"],
    plumbers: ["Plumbing Service", "Pipe Specialist", "Water Systems", "Drainage Experts", "Plumbing Repairs"],
    electricians: ["Electrical Service", "Power Systems", "Wiring Specialist", "Electrical Repairs", "Installation Expert"],
  };

  // Add realistic business names for popular categories
  const realBusinessNames = {
    restaurants: {
      'mumbai': [
        "Afzal's Mao Family Restaurant", 
        "Trishna", 
        "Mahesh Lunch Home", 
        "Britannia & Co.", 
        "The Table", 
        "Pali Village Café", 
        "Bastian", 
        "Jai Hind Lunch Home", 
        "Khyber",
        "Leopold Cafe",
        "Bademiya",
        "Punjab Grill",
        "Gajalee",
        "Cafe Mondegar",
        "Delhi Darbar"
      ],
      'delhi': [
        "Bukhara", 
        "Indian Accent", 
        "Karim's", 
        "Moti Mahal", 
        "Saravana Bhavan", 
        "Punjabi by Nature", 
        "The Spice Route", 
        "Dakshin",
        "Gulati Restaurant",
        "Sagar Ratna",
        "Olive Bar & Kitchen",
        "Farzi Cafe",
        "Oh! Calcutta",
        "Haldiram's"
      ],
      'bangalore': [
        "MTR", 
        "Vidyarthi Bhavan", 
        "Empire Restaurant", 
        "Nagarjuna", 
        "Truffles", 
        "Corner House", 
        "Koshy's", 
        "Meghana Foods",
        "Brahmin's Coffee Bar",
        "CTR (Central Tiffin Room)",
        "The Only Place",
        "Shiv Sagar",
        "Maiya's",
        "Halli Mane"
      ]
    },
    hotels: {
      'mumbai': [
        "The Taj Mahal Palace", 
        "The Oberoi", 
        "Trident Nariman Point", 
        "Four Seasons Hotel", 
        "JW Marriott Mumbai Juhu", 
        "ITC Grand Central", 
        "The Leela",
        "Grand Hyatt Mumbai",
        "The St. Regis Mumbai",
        "Sofitel Mumbai BKC"
      ],
      'delhi': [
        "The Imperial", 
        "The Lodhi", 
        "The Leela Palace", 
        "Taj Palace", 
        "ITC Maurya", 
        "The Claridges",
        "Hyatt Regency Delhi",
        "The Lalit New Delhi",
        "Shangri-La's Eros Hotel",
        "Radisson Blu Plaza"
      ],
      'bangalore': [
        "The Leela Palace", 
        "Taj West End", 
        "ITC Gardenia", 
        "The Oberoi", 
        "JW Marriott Hotel", 
        "Shangri-La Hotel",
        "The Ritz-Carlton",
        "Vivanta by Taj - M.G. Road",
        "Radisson Blu Atria",
        "Aloft Bengaluru Cessna"
      ]
    }
  };

  const getBusinessPrefix = () => {
    const categoryLower = category.toLowerCase();
    for (const [key, prefixes] of Object.entries(mockBusinessTypes)) {
      if (categoryLower.includes(key)) {
        return prefixes;
      }
    }
    return ["Business"];
  };

  const prefixes = getBusinessPrefix();
  const streets = [
    "Main Street", "Park Avenue", "Oak Road", "Maple Lane", 
    "Market Street", "Broadway", "River Road", "Highland Avenue"
  ];

  // Generate realistic Indian phone numbers
  const generatePhoneNumber = () => {
    // Common Indian mobile prefixes
    const prefixes = ['70', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    // Generate remaining 8 digits
    const remaining = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    
    // Format the number
    return `+91 ${prefix}${remaining.substring(0, 5)} ${remaining.substring(5)}`;
  };

  // Generate some sample email domains
  const emailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com', 'business.in'];
  
  // Determine if we should use real business names if available
  const locationLower = location.toLowerCase();
  const categoryLower = category.toLowerCase();
  const hasRealBusinessNames = realBusinessNames[categoryLower] && realBusinessNames[categoryLower][locationLower];
  
  // Generate 10-20 mock leads with improved data
  const count = Math.floor(Math.random() * 11) + 10;
  const mockLeads: Lead[] = [];
  
  // If we have real business names for this category and location, use them first
  if (hasRealBusinessNames) {
    const realNames = realBusinessNames[categoryLower][locationLower];
    for (let i = 0; i < Math.min(realNames.length, count); i++) {
      const businessName = realNames[i];
      const phoneNumber = generatePhoneNumber();
      
      // Generate a sanitized business name for email and website
      const sanitizedName = businessName.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      mockLeads.push({
        name: businessName,
        phone: phoneNumber,
        address: `${Math.floor(Math.random() * 100) + 1} ${
          streets[Math.floor(Math.random() * streets.length)]
        }, ${location}`,
        rating: `${(Math.random() * 3 + 2).toFixed(1)}/5`,
        category: category,
        email: Math.random() > 0.3 ? `info@${sanitizedName}.com` : `${sanitizedName}@${emailDomains[Math.floor(Math.random() * emailDomains.length)]}`,
        website: Math.random() > 0.4 ? `https://www.${sanitizedName}.com` : undefined,
      });
    }
  }
  
  // Fill the remaining slots with generated names
  const remainingCount = count - mockLeads.length;
  for (let i = 0; i < remainingCount; i++) {
    const businessName = `${location} ${prefixes[Math.floor(Math.random() * prefixes.length)]} ${i + 1}`;
    const phoneNumber = generatePhoneNumber();
    
    // Generate a sanitized business name for email and website
    const sanitizedName = businessName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    mockLeads.push({
      name: businessName,
      phone: phoneNumber,
      address: `${Math.floor(Math.random() * 100) + 1} ${
        streets[Math.floor(Math.random() * streets.length)]
      }, ${location}`,
      rating: `${(Math.random() * 3 + 2).toFixed(1)}/5`,
      category: category,
      email: Math.random() > 0.3 ? `info@${sanitizedName}.com` : `${sanitizedName}@${emailDomains[Math.floor(Math.random() * emailDomains.length)]}`,
      website: Math.random() > 0.4 ? `https://www.${sanitizedName}.com` : undefined,
    });
  }

  console.log(`Generated ${mockLeads.length} sample leads for demonstration`);
  return mockLeads;
};

// Add a utility function to standardize phone numbers for consistency
export const standardizePhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Handle Indian numbers
  if (cleaned.startsWith('91') && cleaned.length > 10) {
    cleaned = cleaned.substring(2);
  }
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // Format as +91 XXXXX XXXXX for consistency
  if (cleaned.length === 10) {
    return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
  }
  
  // If we can't standardize, return the original
  return phone;
};

export const exportToExcel = (leads: Lead[], category: string, location: string) => {
  console.log('Exporting to Excel:', leads);
  
  // Standardize all phone numbers before export
  const processedLeads = leads.map(lead => ({
    ...lead,
    phone: standardizePhoneNumber(lead.phone)
  }));
  
  const worksheet = XLSX.utils.json_to_sheet(processedLeads);
  const workbook = XLSX.utils.book_new();
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
  
  // Generate a filename
  const fileName = `Sample_${category.replace(/\s+/g, '_')}_${location.replace(/\s+/g, '_')}_Leads.xlsx`;
  
  // Create an export
  XLSX.writeFile(workbook, fileName);
  
  return fileName;
};
