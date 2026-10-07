"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchableContent, SearchItem } from "@/lib/searchData";
import Fuse from "fuse.js";
import { Suspense, useMemo } from "react";

// Configure Fuse.js options
const fuseOptions = {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "description", weight: 0.3 },
    { name: "category", weight: 0.2 },
  ],
  threshold: 0.4, // Lower = stricter, Higher = looser/more semantic
  distance: 100,
  ignoreLocation: true,
};

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const fuse = useMemo(() => new Fuse(searchableContent, fuseOptions), []);

  const results: SearchItem[] = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query.trim()).map((result) => result.item);
  }, [query, fuse]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">
        Search Results {query && <span>for &ldquo;{query}&rdquo;</span>}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Found {results.length} matching{" "}
        {results.length === 1 ? "result" : "results"}
      </p>

      {results.length > 0 ? (
        <div className="mt-8 space-y-4">
          {results.map((result) => (
            <Link
              key={result.id}
              href={result.href}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-500 hover:shadow-md"
            >
              <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                {result.category}
              </span>
              <h2 className="mt-2 text-base font-semibold text-slate-900">
                {result.title}
              </h2>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {result.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-base font-medium text-slate-700">
            No results found
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Try searching for terms like &ldquo;skin doctor&rdquo;,
            &ldquo;price&rdquo;, or &ldquo;emergency&rdquo;.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-sm">Loading search...</div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
