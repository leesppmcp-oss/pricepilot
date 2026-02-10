import type { SearchResult } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink, Tag } from 'lucide-react';
import { WebsiteLogo } from './website-logo';
import { DealFinder } from './deal-finder';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface ResultsTableProps {
  results: SearchResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  const validPrices = results.map(r => r.price).filter((p): p is number => p !== null && p > 0);
  const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : null;

  const sortedResults = [...results].sort((a, b) => {
    if (a.price === null) return 1;
    if (b.price === null) return -1;
    return a.price - b.price;
  });

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Website</TableHead>
            <TableHead className="w-[120px]">Price</TableHead>
            <TableHead>AI-Powered Deals</TableHead>
            <TableHead className="text-right">Product Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedResults.map(result => (
            <TableRow
              key={result.websiteName}
              className={cn(
                result.price === minPrice &&
                  'bg-primary/10 hover:bg-primary/20'
              )}
            >
              <TableCell>
                <WebsiteLogo name={result.websiteName} />
              </TableCell>
              <TableCell className="font-semibold">
                {result.price !== null ? (
                  <div className="flex items-center gap-2">
                    <span>${result.price.toFixed(2)}</span>
                    {result.price === minPrice && (
                       <Badge variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                         <Tag className="mr-1 h-3 w-3" />
                         Best
                       </Badge>
                    )}
                  </div>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </TableCell>
              <TableCell>
                {result.price !== null && (
                   <DealFinder
                     productName={result.productName}
                     websiteName={result.websiteName}
                   />
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" asChild>
                  <a href={result.url} target="_blank" rel="noopener noreferrer" aria-label={`View on ${result.websiteName}`}>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
