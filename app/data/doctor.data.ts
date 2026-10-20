export const doctor = {
  id: "dr-alexander",
  name: "Dr. Arjun Patel",
  title: "Dermatologist",
  degrees: ["MBBS", "MD (Dermatology)", "DVD"],
  phone: "+91 98765 43210",
  officePhone: "+91 98765 43211",
  email: "arjun.patel@example.com",
  emergencyPhone: "+91 98765 43212",
  image:
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",

  education: [
    {
      year: "2014",
      degree: "MBBS",
      institute: "Seth GS Medical College, Mumbai",
    },
    {
      year: "2018",
      degree: "MD (Dermatology)",
      institute: "King Edward Memorial Hospital, Mumbai",
    },
    {
      year: "2022",
      degree: "Advanced Dermatology Training",
      institute: "AIIMS, New Delhi",
    },
  ],

  experience: [
    {
      year: "2015 - 18",
      department: "Junior Resident",
      hospital: "KEM Hospital, Mumbai",
    },
    {
      year: "2018 - 23",
      department: "Consultant Dermatologist",
      hospital: "Ruby Hall Clinic, Pune",
    },
    {
      year: "2023",
      department: "Senior Dermatologist",
      hospital: "Deenanath Mangeshkar Hospital, Pune",
    },
  ],

  skills: [
    { name: "Patient Satisfaction", percentage: 80 },
    { name: "Treatment Success", percentage: 90 },
    { name: "Patient Referrals", percentage: 70 },
  ],

  benefits: [
    "Comprehensive skin and hair care",
    "Personalized dermatology treatments",
    "Advanced skin health assessments",
  ],

  schedules: [
    { day: "MON", time: "11:30AM - 02:30PM" },
    { day: "WED", time: "12:00PM - 05:00PM" },
    { day: "SAT", time: "02:00PM - 07:30PM" },
  ],
};

export interface DoctorSummary {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bgColor?: string;
}

export const doctorsData: DoctorSummary[] = [
  {
    id: "dr-nishita-raw",
    name: "Dr. Nishita Sharma",
    specialty: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-blue-600",
  },
  {
    id: "dr-eishita-jery",
    name: "Dr. Eshita Deshmukh",
    specialty: "Specialist Heart Surgery",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-emerald-500",
  },
  {
    id: "dr-christopher",
    name: "Dr. Rohan Kulkarni",
    specialty: "Senior Therapist",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "dr-alexander",
    name: "Dr. Arjun Patel",
    specialty: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "dr-kenneth",
    name: "Dr. Sneha Joshi",
    specialty: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "dr-benjamin",
    name: "Dr. Vikram Mehta",
    specialty: "Anesthesiologist",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "dr-nicholas",
    name: "Dr. Aditya Desai",
    specialty: "Medicine Specialist",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "dr-christian",
    name: "Dr. Priya Nair",
    specialty: "Family Physician",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
  },
];