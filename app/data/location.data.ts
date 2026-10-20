
export interface LocationInfo {
    city: string;
  address: string;
  email: string;
  phone: string;
  lat: number;
  lng: number;
  
  
}

export const locations: LocationInfo[] = [
{
    city: "Pune",
    address: "Shivajinagar, Pune, Maharashtra, India",
    email: "medifay@example.com",
    phone: "+91 98765 43210",
    lat: 18.5308,
    lng: 73.8475,
  },
  {
    city: "Pimpri-Chinchwad",
    address: "Pimpri, Pune, Maharashtra, India",
    email: "medifay@example.com",
    phone: "+91 98765 43211",
    lat: 18.6298,
    lng: 73.7997,
  },
  {
    city: "Hinjawadi",
    address: "Hinjawadi IT Park, Pune, Maharashtra, India",
    email: "medifay@example.com",
    phone: "+91 98765 43212",
    lat: 18.5913,
    lng: 73.7389,
  },
  {
    city: "Kothrud",
    address: "Kothrud, Pune, Maharashtra, India",
    email: "medifay@example.com",
    phone: "+91 98765 43213",
    lat: 18.5074,
    lng: 73.8077,
  },
];
