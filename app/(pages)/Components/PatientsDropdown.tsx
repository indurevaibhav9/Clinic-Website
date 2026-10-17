"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, CalendarDays, Users, UserPlus } from "lucide-react";

export default function PatientsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      label: "Today's Patients",
      description: "View today's appointments",
      icon: CalendarDays,
      href: "/patient-list/todays-patients",
    },
    {
      label: "All Patients",
      description: "View and manage patients",
      icon: Users,
      href: "/patient-list",
    },
    {
      label: "Register Patient",
      description: "Add a new patient",
      icon: UserPlus,
      href: "/patient-list/register",
    },
  ];

  function handleNavigation(href: string) {
    setIsOpen(false);
    router.push(href);
  }

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className=" flex items-center gap-2 rounded-lg px-3 py-2
          text-sm font-medium text-black transition
          dark:hover:bg-gray-300"
      >
        Patients
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 w-64
            rounded-xl border border-gray-200 bg-white p-2
            shadow-lg dark:border-gray-700 dark:bg-gray-900"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.href}
                type="button"
                role="menuitem"
                onClick={() => handleNavigation(item.href)}
                className="flex w-full items-center gap-3
                  rounded-lg px-3 py-3 text-left
                  transition hover:bg-gray-100
                  dark:hover:bg-gray-800"
              >
                <span
                  className="flex h-10 w-10 shrink-0
                  items-center justify-center rounded-lg
                  bg-blue-50 text-blue-600
                  dark:bg-blue-950 dark:text-blue-400"
                >
                  <Icon size={20} />
                </span>

                <span className="flex flex-col gap-1">
                  <span
                    className="text-sm font-medium
                    text-gray-900 dark:text-gray-100"
                  >
                    {item.label}
                  </span>

                  <span
                    className="text-xs text-gray-500
                    dark:text-gray-400"
                  >
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
