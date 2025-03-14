
import * as XLSX from 'xlsx';

export interface Lead {
  name: string;
  phone: string;
  address: string;
  rating?: string;
  category?: string;
}

export const extractLeads = async (
  category: string,
  location: string
): Promise<Lead[]> => {
  // In a real implementation, this would make API calls to a backend service
  // that handles web scraping. For demo purposes, we'll simulate the extraction
  // with a delay and mock data

  // Simulate network request
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Generate mock data based on the inputs
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

  // Generate 10-20 mock leads
  const count = Math.floor(Math.random() * 11) + 10;
  const mockLeads: Lead[] = Array.from({ length: count }, (_, i) => {
    const namePrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    return {
      name: `${location} ${namePrefix} ${i + 1}`,
      phone: `+91 ${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`,
      address: `${Math.floor(Math.random() * 100) + 1} ${
        streets[Math.floor(Math.random() * streets.length)]
      }, ${location}`,
      rating: `${(Math.random() * 3 + 2).toFixed(1)}/5`,
      category: category
    };
  });

  return mockLeads;
};

export const exportToExcel = (leads: Lead[], category: string, location: string) => {
  const worksheet = XLSX.utils.json_to_sheet(leads);
  const workbook = XLSX.utils.book_new();
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
  
  // Generate a filename
  const fileName = `JustDial_${category.replace(/\s+/g, '_')}_${location.replace(/\s+/g, '_')}_Leads.xlsx`;
  
  // Create an export
  XLSX.writeFile(workbook, fileName);
  
  return fileName;
};
