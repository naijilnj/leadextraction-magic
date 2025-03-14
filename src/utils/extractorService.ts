
import * as XLSX from 'xlsx';

export interface Lead {
  name: string;
  phone: string;
  address: string;
  rating?: string;
  category?: string;
  email?: string;
  website?: string;
}

export const extractLeads = async (
  category: string,
  location: string
): Promise<Lead[]> => {
  // In a real implementation, this would make API calls to a backend service
  // that handles web scraping. For demo purposes, we're simulating extraction
  
  console.log(`Extracting leads for ${category} in ${location}`);
  
  // Simulate network request
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Generate more realistic mock data with better phone number formatting
  const mockBusinessTypes = {
    restaurants: ["Restaurant", "Café", "Bistro", "Diner", "Eatery"],
    hotels: ["Hotel", "Resort", "Inn", "Suites", "Lodging"],
    doctors: ["Clinic", "Medical Center", "Hospital", "Specialist", "Practice"],
    plumbers: ["Plumbing Service", "Pipe Specialist", "Water Systems", "Drainage Experts", "Plumbing Repairs"],
    electricians: ["Electrical Service", "Power Systems", "Wiring Specialist", "Electrical Repairs", "Installation Expert"],
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
    
    // Format the number in different ways to simulate different extraction scenarios
    const formats = [
      `+91${prefix}${remaining}`,
      `+91 ${prefix}${remaining}`,
      `+91-${prefix}-${remaining}`,
      `${prefix}${remaining}`,
      `${prefix} ${remaining}`,
      `${prefix}-${remaining}`,
      `0${prefix}${remaining}`
    ];
    
    return formats[Math.floor(Math.random() * formats.length)];
  };

  // Generate some sample email domains
  const emailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com', 'business.in'];
  
  // Generate 10-20 mock leads with improved data
  const count = Math.floor(Math.random() * 11) + 10;
  const mockLeads: Lead[] = Array.from({ length: count }, (_, i) => {
    const businessName = `${location} ${prefixes[Math.floor(Math.random() * prefixes.length)]} ${i + 1}`;
    const phoneNumber = generatePhoneNumber();
    
    // Generate a sanitized business name for email and website
    const sanitizedName = businessName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    return {
      name: businessName,
      phone: phoneNumber,
      address: `${Math.floor(Math.random() * 100) + 1} ${
        streets[Math.floor(Math.random() * streets.length)]
      }, ${location}`,
      rating: `${(Math.random() * 3 + 2).toFixed(1)}/5`,
      category: category,
      email: Math.random() > 0.3 ? `info@${sanitizedName}.com` : `${sanitizedName}@${emailDomains[Math.floor(Math.random() * emailDomains.length)]}`,
      website: Math.random() > 0.4 ? `https://www.${sanitizedName}.com` : null,
    };
  });

  console.log(`Generated ${mockLeads.length} leads with improved phone number formatting`);
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
  const fileName = `JustDial_${category.replace(/\s+/g, '_')}_${location.replace(/\s+/g, '_')}_Leads.xlsx`;
  
  // Create an export
  XLSX.writeFile(workbook, fileName);
  
  return fileName;
};
