import  HeaderComponent from "../Components/HeaderCompontent"
import FooterComponent from "../Components/FooterComponent"
import React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, ChevronRight } from "lucide-react"
export default function AboutUsComponent() {

    const schedule = [
    { days: "Mon-Tue day:", hours: "9:00 am - 10.00 pm" },
    { days: "Wed-Thu day:", hours: "9:00 am - 10.00 pm" },
    { days: "Friday:", hours: "9:00 am - 10.00 pm" },
    { days: "Sat-Sun day:", hours: "Closed", isClosed: true },
  ]
    return (
        <div>
            <HeaderComponent/>
        <section className="relative w-full bg-white pb-16 lg:pb-24">
      {/* TOP BLUE HEADER BANNER */}
      <div className="relative w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-40 text-white overflow-hidden">
        {/* Background Decorative DNA Strand / Grid Watermark */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            About Us
          </h1>

          {/* Breadcrumb Navigation */}
          <nav className="mt-3 flex items-center gap-1.5 text-xs font-medium text-blue-100">
            <Link href="#" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 opacity-70" />
            <span className="text-blue-200">About Us</span>
          </nav>
        </div>
      </div>

      {/* OVERLAY CARDS SECTION */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28 lg:-mt-32">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          
          {/* CARD 1: Working Time */}
          <Card className="border border-gray-100 bg-white shadow-xl rounded-2xl flex flex-col justify-between">
            <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-6">
                  Working Time
                </h3>

                <ul className="space-y-3 text-xs">
                  {schedule.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-gray-600"
                    >
                      <span className="font-medium">{item.days}</span>
                      <span
                        className={
                          item.isClosed
                            ? "font-bold text-blue-600"
                            : "text-gray-500"
                        }
                      >
                        {item.hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* CARD 2: Doctors Timetable (Active / Highlighted) */}
          <Card className="border-2 border-blue-500 bg-white shadow-xl rounded-2xl flex flex-col justify-between">
            <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full text-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Doctors Timetable
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  It is a long established fact that are ader will be distracted by the read ble content of a page when
                </p>
              </div>

              <div className="mt-6">
                <Button className="w-full bg-[#0d5cff] hover:bg-blue-700 text-white font-medium text-xs py-2.5 rounded-md shadow-md">
                  View Timetable
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CARD 3: Appointments */}
          <Card className="border border-gray-100 bg-white shadow-xl rounded-2xl flex flex-col justify-between">
            <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full text-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Appointments
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  It is a long established fact that are ader will be distracted by the read ble content of a page when
                </p>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-800 hover:border-blue-600 hover:text-blue-600 font-medium text-xs py-2.5 rounded-md"
                >
                  Make Appointment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CARD 4: Emergency Call */}
          <Card className="border border-gray-100 bg-white shadow-xl rounded-2xl flex flex-col justify-between">
            <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full text-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Emergency Call
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  It is a long established fact that are ader will be distracted by the read ble content of a page when
                </p>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full border-blue-200 bg-blue-50/50 text-blue-700 hover:bg-blue-100 font-bold text-xs py-2.5 rounded-md flex items-center justify-center gap-2"
                >
                  <Phone className="h-3.5 w-3.5 text-blue-600 fill-blue-600" />
                  <span>+88 ( 5548 ) 6548</span>
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
    
    
    
        <FooterComponent/>
        </div>
    );
    }