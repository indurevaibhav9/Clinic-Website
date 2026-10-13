
export const doctor = {
  id: "dr-alexander",
  name: "Dr. Alexander",
  title: "Dermatologist",
  degrees: ["BDS", "FCPS (Hons)", "PhD (Japan)"],
  phone: "+(123) 1800-567",
  officePhone: "+(123) 1800-567",
  email: "mediinfo@tiprt.com",
  emergencyPhone: "+001236540256",
  image:
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",

  education: [
    {
      year: "2014",
      degree: "MBBS",
      institute: "Medical University UK",
    },
    {
      year: "2018",
      degree: "B.Med, MB",
      institute: "Dhaka Medical College",
    },
    {
      year: "2022",
      degree: "B.Med, MB",
      institute: "California USA University",
    },
  ],

  experience: [
    {
      year: "2015 - 18",
      department: "MBChB, MBCh",
      hospital: "Medical University UK",
    },
    {
      year: "2018 - 23",
      department: "MB, BM",
      hospital: "Dhaka Medical College",
    },
    {
      year: "2023",
      department: "B.S, B.Surg",
      hospital: "Rajdhani University",
    },
  ],

  skills: [
    { name: "Client Satisfaction", percentage: 80 },
    { name: "Medic Success", percentage: 90 },
    { name: "Client Referral", percentage: 70 },
  ],

  benefits: [
    "Routine and medical care",
    "Excellence in Healthcare every",
    "Building a healthy environment",
  ],

  schedules: [
    { day: "SUN", time: "11:30AM - 02:30PM" },
    { day: "THU", time: "12:00PM - 05:00PM" },
    { day: "SUN", time: "02:00PM - 07:30PM" },
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
    name: "Dr. Nishita Raw",
    specialty: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-blue-600",
  },
  {
    id: "dr-eishita-jery",
    name: "Dr. Eishita Jery",
    specialty: "Specialist Heart Surgery",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    bgColor: "bg-emerald-500",
  },
  {
    id: "dr-christopher",
    name: "Dr. Christopher",
    specialty: "Senior Therapist",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "dr-alexander",
    name: "Dr. Alexander",
    specialty: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "dr-kenneth",
    name: "Dr. Kenneth",
    specialty: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "dr-benjamin",
    name: "Dr. Benjamin",
    specialty: "Anesthesiologist",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "dr-nicholas",
    name: "Dr. Nicholas",
    specialty: "Medicine Specialist",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "dr-christian",
    name: "Dr. Christian",
    specialty: "Family Physician",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
  },
];
