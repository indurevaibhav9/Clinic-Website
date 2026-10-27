// components/SearchBar.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = query.trim();
    if (searchTerm.length < 2) {
      setError(searchTerm ? "Enter at least 2 characters to search." : "Enter a search term.");
      return;
    }
    if (searchTerm.length > 100) {
      setError("Search terms cannot exceed 100 characters.");
      return;
    }

    setError("");
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center w-full max-w-xs"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setError("");
        }}
        maxLength={100}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "search-error" : undefined}
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
      {error && (
        <p id="search-error" className="absolute left-3 top-full mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
