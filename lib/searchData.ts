// lib/searchData.ts

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category:
    | "Services"
    | "Doctors"
    | "FAQs"
    | "Pricing"
    | "Testimonials"
    | "Blogs"
    | "About";
  href: string;
}

export const searchableContent: SearchItem[] = [
  // ==================== FAQs ====================
  {
    id: "faq-1",
    title: "How Much Does Medical Cost?",
    description:
      "The cost of medical services depends on the type of treatment, consultation, and healthcare service required. Please contact us for detailed pricing information.",
    category: "FAQs",
    href: "/faqs",
  },
  {
    id: "faq-2",
    title: "What Health Plans Are Available Through Medicare?",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    category: "FAQs",
    href: "/faqs",
  },
  {
    id: "faq-3",
    title: "Will I Be Able To Stay With My Doctor?",
    description:
      "Yes. We aim to provide continuity of care whenever possible. You can continue consulting with your preferred doctor based on their availability.",
    category: "FAQs",
    href: "/faqs",
  },
  {
    id: "faq-4",
    title: "If I Sign Up For Medical, Will Anything Happen My Assets?",
    description:
      "No. Your personal information and assets are handled securely and according to our privacy and security policies.",
    category: "FAQs",
    href: "/faqs",
  },
  {
    id: "faq-5",
    title: "What Happens To My Sample Once I Have Provided It?",
    description:
      "Samples are handled by trained medical professionals and processed according to appropriate medical and laboratory procedures.",
    category: "FAQs",
    href: "/faqs",
  },

  // ==================== DOCTORS ====================
  {
    id: "doc-1",
    title: "Dr. Alexander - Dermatologist",
    description: "Specialist in dermatology and skin care treatments.",
    category: "Doctors",
    href: "/doctors",
  },
  {
    id: "doc-2",
    title: "Dr. Nishita Raw - Cardiologist",
    description:
      "Senior cardiologist specializing in heart health and cardiovascular treatment.",
    category: "Doctors",
    href: "/doctors",
  },
  {
    id: "doc-3",
    title: "Dr. Christopher - Senior Therapist",
    description: "Experienced physical and mental therapy specialist.",
    category: "Doctors",
    href: "/doctors",
  },
  {
    id: "doc-4",
    title: "Dr. Eishita Jery - Heart Surgery Specialist",
    description: "Expert surgeon specializing in advanced cardiac surgeries.",
    category: "Doctors",
    href: "/doctors",
  },

  // ==================== SERVICES ====================
  {
    id: "srv-1",
    title: "ENT & Otology",
    description:
      "Ear, Nose, and Throat diagnostics, consultations, and surgical services.",
    category: "Services",
    href: "/services",
  },
  {
    id: "srv-2",
    title: "Pulmonology & Respiratory",
    description: "Comprehensive care for lung and respiratory conditions.",
    category: "Services",
    href: "/services",
  },
  {
    id: "srv-3",
    title: "X-Ray Imaging And Reporting",
    description:
      "High-precision digital diagnostic x-ray imaging and lab reporting.",
    category: "Services",
    href: "/services",
  },
  {
    id: "srv-4",
    title: "Microbiology & Pathology",
    description: "Advanced clinical laboratory testing and pathology analyses.",
    category: "Services",
    href: "/services",
  },
  {
    id: "srv-5",
    title: "Orthopedics & Joint Care",
    description:
      "Bone health, joint replacement, and orthopedic rehabilitation.",
    category: "Services",
    href: "/services",
  },
  {
    id: "srv-6",
    title: "Gynecology & Obstetrics",
    description:
      "Women's healthcare, maternity care, and prenatal diagnostics.",
    category: "Services",
    href: "/services",
  },
  {
    id: "srv-7",
    title: "General Diagnostics & Cardiology",
    description:
      "Comprehensive medical checkups, cardiac clinic, masseter therapy, and ambulance services.",
    category: "Services",
    href: "/services",
  },

  // ==================== PRICING PLANS ====================
  {
    id: "plan-1",
    title: "Regular Plan ($20)",
    description:
      "Includes Access To Employers Hotline, Binding Arbitration, State & Federal Postings, 24/7 Customer Support.",
    category: "Pricing",
    href: "/home",
  },
  {
    id: "plan-2",
    title: "Standard Plan ($60) - Best Plan",
    description:
      "Our recommended package including full support, employer hotline access, and safety training topics.",
    category: "Pricing",
    href: "/home",
  },
  {
    id: "plan-3",
    title: "Business Plan ($80)",
    description:
      "Enhanced medical package for businesses, including hotline access and class arbitrations.",
    category: "Pricing",
    href: "/home",
  },
  {
    id: "plan-4",
    title: "Premium Plan ($99)",
    description:
      "Full suite medical subscription with 24/7 customer support and free equipment use.",
    category: "Pricing",
    href: "home",
  },

  // ==================== TESTIMONIALS / FEEDBACK ====================
  {
    id: "test-1",
    title: "Patient Feedback - Priya Sharma",
    description:
      "The doctors were very professional and caring. The appointment process was simple and the staff made me feel comfortable throughout my visit.",
    category: "Testimonials",
    href: "/feedback",
  },
  {
    id: "test-2",
    title: "Patient Feedback - Rahul Patil",
    description:
      "I had a very good experience with MediFast. The doctor listened carefully to my concerns and explained everything clearly.",
    category: "Testimonials",
    href: "/feedback",
  },
  {
    id: "test-3",
    title: "Patient Feedback - Sneha Kulkarni",
    description:
      "The online appointment process was convenient and easy to use. I would definitely recommend the clinic to my family and friends.",
    category: "Testimonials",
    href: "/feedback",
  },

  // ==================== BLOG / RECENT POSTS ====================
  {
    id: "blog-1",
    title: "Scientist wearing overall in as ped medical laboratory",
    description:
      "Published on 16 Feb 2023. Insights into modern laboratory testing and research procedures.",
    category: "Blogs",
    href: "/blog",
  },
  {
    id: "blog-2",
    title: "Female doctors checking resu on digital tablet",
    description:
      "Published on 16 Feb 2023. Digital health trends and tablet diagnostics in healthcare.",
    category: "Blogs",
    href: "/blog",
  },

  // ==================== ABOUT & CLINIC INFO ====================
  {
    id: "about-1",
    title: "Working Hours & Schedule",
    description:
      "Mon-Fri: 9:00 am - 10:00 pm | Weekends (Sat-Sun): Closed. Contact Emergency Call at +88 ( 5548 ) 6548.",
    category: "About",
    href: "/aboutUs",
  },
  {
    id: "about-2",
    title: "Appointments & Emergency Care",
    description:
      "Book an appointment online or view doctor timetables. Call our 24/7 emergency hotline for immediate assistance.",
    category: "About",
    href: "/aboutUs",
  },
];
