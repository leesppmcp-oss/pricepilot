'use client';

import * as React from 'react';
import { Header } from '@/components/header';
import { SearchForm, type SearchFormValues } from '@/components/search-form';
import { ResultsTable } from '@/components/results-table';
import { ResultsSkeleton } from '@/components/results-skeleton';
import { searchPricesAction } from '@/app/actions';
import type { SearchResult } from '@/lib/types';
import { Compass } from 'lucide-react';

export default function Home() {
  const [results, setResults] = React.useState<SearchResult[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSearch = async (data: SearchFormValues) => {
    setIsLoading(true);
    setResults(null);
    setError(null);
    try {
      const searchResults = await searchPricesAction(data);
      setResults(searchResults);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <SearchForm onSubmit={handleSearch} isLoading={isLoading} />

          <div className="mt-12">
            {isLoading && <ResultsSkeleton />}
            {error && (
              <div className="text-center text-destructive">
                <p>{error}</p>
              </div>
            )}
            {results && results.length > 0 && <ResultsTable results={results} />}
            {results && results.length === 0 && !isLoading && (
              <div className="text-center text-muted-foreground py-10">
                <p>No results found for this product. Try another search.</p>
              </div>
            )}
            {!isLoading && !results && !error && (
              <div className="text-center text-muted-foreground py-10 flex flex-col items-center gap-4">
                <Compass className="w-16 h-16" />
                <h2 className="text-2xl font-semibold text-foreground">
                  Ready to find the best deals?
                </h2>
                <p>
                  Enter a product name and select websites to start your price
                  comparison.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} PricePilot. All rights reserved.
      </footer>
    </div>
  );
}
