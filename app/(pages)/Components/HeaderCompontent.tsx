"use client"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Search, Stethoscope, PhoneCall, Calendar, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClipboardList, Award, Rocket, Crown, Tag } from "lucide-react"
import {
  Sparkles,
  Ear,
  Wind,
  Activity,
  Microscope,
  Bone,
  Baby,


} from "lucide-react"
import {
  MapPin,




  ChevronsRight,


  ArrowUp,


} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  UserCheck,
  Ambulance,


  Clock,
  Users,
  Smile,
  Bed,
  Trophy,


} from "lucide-react"


import { Plus, Minus, Pill } from "lucide-react"
export default function HeaderComponent() {
    function handleAppointmentClick() {
  console.log("Appointment button clicked")
}
return(
    <div>
    {/* HEADER */}
<header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
  <div className="mx-auto flex h-20 max-w-7xl items-center justify-between pl-0 pr-4 sm:pr-6 lg:pr-8">
    {/* Left Section: Logo Badge */}
    <div className="flex h-full shrink-0 items-center bg-blue-600 px-4 sm:px-6 py-3 text-white">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
          <Stethoscope className="h-6 w-6 text-green-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold leading-none tracking-tight">
            MediFast
          </span>
          <span className="mt-1 text-[10px] font-medium tracking-wider opacity-90">
            Health & Medical
          </span>
        </div>
      </Link>
    </div>
    {/* Middle Section: Navigation Links */}
    <nav className="hidden items-center space-x-3 lg:flex lg:space-x-8">
      <Link href="#" className="whitespace-nowrap text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
        Home
      </Link>
      <Link href="#" className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        About
      </Link>
      <Link href="#" className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        Department
      </Link>
      <Link href="#" className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        Doctor
      </Link>
      <Link href="#" className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        Pages
      </Link>
      <Link href="#" className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        News
      </Link>
      <Link href="#" className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
        Contact Us
      </Link>
    </nav>
    {/* Right Section: Action Buttons */}
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-md border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
      <Button
        className="hidden h-10 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white shadow-none hover:bg-blue-700 sm:flex sm:px-6"
        onClick={handleAppointmentClick}
      >
        Appointment
      </Button>
      {/* Mobile Navigation Trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 lg:hidden text-gray-700 hover:bg-gray-100"
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </Button>
    </div>
  </div>
</header>
</div>
)
}