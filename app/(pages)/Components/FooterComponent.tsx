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
export default function FooterComponent() {
    return (
        <div>
            {/* FOOTER */}
            <footer className="w-full bg-blue-600 py-4 text-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8 text-center sm:text-left">
                    <p className="text-sm font-normal text-white/90">
                        2023 © All rights reserved by Devsnest-llc
                    </p>
                    <div className="flex items-center gap-4 text-sm font-normal">
                        <Link href="#" className="text-white/90 hover:text-white">
                            Privacy Policy
                        </Link>
                        <span className="h-4 w-[1px] bg-white/40" aria-hidden="true" />
                        <Link href="#" className="text-white/90 hover:text-white">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )

}