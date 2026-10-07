// components/SearchBar.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Redirect to search results page with query parameter
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center w-full max-w-xs"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search services, doctors, articles..."
        className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-4 pr-10 text-xs focus:border-blue-500 focus:bg-white focus:outline-none text-slate-800"
      />
      <button
        type="submit"
        className="absolute right-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
        aria-label="Submit search"
      >
        <Search className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}
