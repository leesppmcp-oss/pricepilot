'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { findWebsiteDealsAction } from '@/app/actions';
import { Loader2, Sparkles, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface DealFinderProps {
  productName: string;
  websiteName: string;
}

export function DealFinder({ productName, websiteName }: DealFinderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [deals, setDeals] = React.useState<string[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleFindDeals = async () => {
    setIsLoading(true);
    setDeals(null);

    const result = await findWebsiteDealsAction(productName, websiteName);
    
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error Finding Deals',
        description: result.error,
      });
      setIsOpen(false);
    } else {
      setDeals(result.deals);
    }
    
    setIsLoading(false);
  };

  const onOpenChange = (open: boolean) => {
    if (open && !isLoading && !deals) {
      handleFindDeals();
    }
    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Button onClick={() => onOpenChange(true)} variant="outline" size="sm" disabled={isLoading}>
        {isLoading && !isOpen ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4 text-accent" />
        )}
        Find Deals
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="text-accent" />
            AI Deal Finder
          </DialogTitle>
          <DialogDescription>
            AI-powered deals for <strong>{productName}</strong> on{' '}
            <strong>{websiteName}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-[150px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Searching for deals...</p>
            </div>
          ) : deals && deals.length > 0 ? (
            <ul className="grid gap-3 py-4 list-disc pl-5">
              {deals.map((deal, index) => (
                <li key={index} className="text-sm">
                  {deal}
                </li>
              ))}
            </ul>
          ) : (
            <Alert variant="default" className="w-full">
              <XCircle className="h-4 w-4" />
              <AlertTitle>No Special Deals Found</AlertTitle>
              <AlertDescription>
                The AI couldn't find any special deals or coupon codes at this time.
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
