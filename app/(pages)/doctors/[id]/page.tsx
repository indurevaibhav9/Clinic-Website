"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall, CheckCircle2, ChevronRight } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AppointmentForm from "../../Components/AppointmentForm";
import { useParams } from "next/navigation";

type DoctorDetails = {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bgColor: string;
};

type Props = {
  params: Promise<{ id: string }>;
};
const doctorsData: DoctorDetails[] = [
 
 {
  id: "Nishita",
  name: "Dr. Nishita Sharma",
  specialty: "Cardiologist",
  image:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
  bgColor: "bg-blue-600",
},
{
  id: "Eishita",
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
  bgColor: "bg-blue-600",
},
{
  id: "dr-alexander",
  name: "Dr. Arjun Patel",
  specialty: "Dermatologist",
  image:
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
  bgColor: "bg-blue-600",
},
{
  id: "dr-kenneth",
  name: "Dr. Sneha Joshi",
  specialty: "Dermatologist",
  image:
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=800&auto=format&fit=crop",
  bgColor: "bg-blue-600",
},
{
  id: "dr-benjamin",
  name: "Dr. Vikram Mehta",
  specialty: "Anesthesiologist",
  image:
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
  bgColor: "bg-blue-600",
},
{
  id: "dr-nicholas",
  name: "Dr. Aditya Desai",
  specialty: "Medicine Specialist",
  image:
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
  bgColor: "bg-blue-600",
},
{
  id: "dr-christian",
  name: "Dr. Priya Nair",
  specialty: "Family Physician",
  image:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
  bgColor: "bg-blue-600",
},
 

];
export default function DoctorDetailsPage() {
 const doctor = {
  name: "Dr. Arjun Patel",
  title: "MBBS, Dermatologist",
  degrees: "MBBS, MD (Dermatology), DVD",
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
      year: "2023 - Present",
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
    "Acne and scar management",
    "Preventive skin care guidance",
    "Patient-focused consultations",
  ],

  schedules: [
    { day: "MON", time: "11:30 AM - 02:30 PM" },
    { day: "WED", time: "12:00 PM - 05:00 PM" },
    { day: "SAT", time: "02:00 PM - 07:30 PM" },
  ],
};
 

  const params = useParams<{ id: string }>();
  const id = params.id;
  const doctor2: DoctorDetails | undefined = doctorsData.find(
    (d) => d.id == id,
  );
  // console.log(doctor2);
  const [showForm, setShowForm] = useState(false);

  const handleBookAppointment = () => {
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-blue-400 pb-20 text-gray-800">
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Book an Appointment</DialogTitle>
          </DialogHeader>

          <AppointmentForm setShowForm={setShowForm} />
        </DialogContent>
      </Dialog>
      {/* Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 py-16 text-white md:py-20">
        <div className="relative mx-auto max-w-7xl px-6">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Doctor Details
          </h1>
          <nav className="mt-3 flex items-center gap-2 text-sm text-blue-100">
            <Link
              href="/"
              className="hover:underline hover:text-white transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/doctors"
              className="hover:underline hover:text-white transition-colors"
            >
              Doctor
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-white">{doctor2?.name}</span>
          </nav>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="mx-auto max-w-7xl px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              {/* Doctor Headshot */}
              <div className="relative h-72 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100">
                <Image
                  src={doctor2?.image || ""}
                  alt={doctor2?.image || ""}
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Title Info */}
              <h2 className="text-xl font-bold text-gray-900">{doctor2?.name}</h2>
              <p className="text-xs font-semibold text-blue-600 mt-1">
                {doctor2?.specialty}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{doctor.degrees}</p>

              <hr className="my-6 border-gray-100" />

              {/* Personal Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  Personal Info
                </h3>
                <p className="text-xs text-gray-500">
                  <strong className="text-gray-700">Phone: </strong>
                  {doctor.phone}
                </p>
                <p className="text-xs text-gray-500">
                  <strong className="text-gray-700">Office: </strong>
                  {doctor.officePhone}
                </p>
                <p className="text-xs text-gray-500">
                  <strong className="text-gray-700">E-mail: </strong>
                  {doctor.email}
                </p>
              </div>

              <hr className="my-6 border-gray-100" />

              {/* Social Media */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">
                  Follow Me Social
                </h3>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                    <FaFacebook className="h-4 w-4" />
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                    <FaTwitter className="h-4 w-4" />
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                    <FaLinkedin className="h-4 w-4" />
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                    <FaYoutube className="h-4 w-4" />
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                    <FaInstagram className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency Contact Card */}
            <div className="bg-blue-50/80 rounded-2xl p-5 flex items-center gap-4 border border-blue-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0 shadow-md shadow-blue-600/20">
                <PhoneCall className="h-6 w-6" />
              </div>
              <div>
                <span className="text-sm font-bold text-gray-900 block">
                  {doctor.emergencyPhone}
                </span>
                <span className="text-xs text-blue-600 font-medium">
                  Emergency Cases
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT MAIN DETAILS ================= */}
          <div className="lg:col-span-8 space-y-8">
            {/* About Doctor, Education, Experience, Skills & Benefits */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-8">
              {/* About Section */}
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 mb-4">
                  About Doctor
                </h2>
                <div className="space-y-4 text-xs leading-relaxed text-gray-500">
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which dont
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isnt
                    anything embarrassing hidden in the middle of text. All the
                    Lorem Ipsum generators on the Internet tend to repeat
                    predefined.
                  </p>
                  <p>
                    Chunks as necessary, making this the first true generator on
                    the Internet. It uses a dictionary of over 200 Latin words
                    combined with a handful of model sentence structures, to
                    generate Lorem Ipsum which looks.
                  </p>
                </div>
              </div>

              {/* Education & Experience Tables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                {/* Education */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-4">
                    Education
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-gray-900 border-b border-gray-100">
                          <th className="pb-2 font-bold">Year</th>
                          <th className="pb-2 font-bold">Degree</th>
                          <th className="pb-2 font-bold">Institute</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-gray-500">
                        {doctor.education.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 font-medium">{item.year}</td>
                            <td className="py-2.5">{item.degree}</td>
                            <td className="py-2.5">{item.institute}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-4">
                    Experience
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-gray-900 border-b border-gray-100">
                          <th className="pb-2 font-bold">Year</th>
                          <th className="pb-2 font-bold">Department</th>
                          <th className="pb-2 font-bold">Hospital</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-gray-500">
                        {doctor.experience.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 font-medium">{item.year}</td>
                            <td className="py-2.5">{item.department}</td>
                            <td className="py-2.5">{item.hospital}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Skills & Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {/* Skills Progress Bars */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-4">
                    Skills Of Doctor
                  </h3>
                  <div className="space-y-4">
                    {doctor.skills.map((skill, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-gray-600">
                          <span>{skill.name}</span>
                          <span>{skill.percentage}%</span>
                        </div>
                        <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-400 rounded-full transition-all duration-500"
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits List */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-4">
                    Benefits Of Doctor
                  </h3>
                  <ul className="space-y-2">
                    {doctor.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-gray-500"
                      >
                        <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Paragraphs */}
              <div className="space-y-4 text-xs leading-relaxed text-gray-500 pt-2 border-t border-gray-100">
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which dont look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isnt anything
                  embarrassing hidden in the middle of text. All the Lorem Ipsum
                  generators on the Internet tend to repeat predefined.
                </p>
                <p>
                  Chunks as necessary, making this the first true generator on
                  the Internet. It uses a dictionary of over 200 Latin words
                  combined with a handful of model sentence structures, to
                  generate Lorem Ipsum which looks.
                </p>
              </div>
            </div>

            {/* Appointment Schedule Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6">
                Appointment Schedules:
              </h2>
              <div className="space-y-4">
                {doctor.schedules.map((schedule, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 sm:p-4 rounded-xl bg-slate-50/60"
                  >
                    <div className="grid grid-cols-2 gap-4 w-full sm:w-auto items-center">
                      <span className="text-xs font-bold text-gray-700 bg-white px-4 py-2 rounded-lg text-center border border-gray-100 min-w-[70px]">
                        {schedule.day}
                      </span>
                      <span className="text-xs font-medium text-gray-600 bg-blue-50/50 px-4 py-2 rounded-lg text-center">
                        {schedule.time}
                      </span>
                    </div>
                    <button
                      onClick={() => handleBookAppointment()}
                      className="w-full sm:w-auto text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2.5 rounded-xl shadow-sm"
                    >
                      Now Appointment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
