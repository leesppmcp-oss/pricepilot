import { HandCoins } from 'lucide-react';

export function Header() {
  return (
    <header className="py-8 px-4 sm:px-6 lg:px-8 bg-card border-b">
      <div className="flex items-center justify-center gap-3">
        <HandCoins className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl font-headline">
          PricePilot
        </h1>
      </div>
      <p className="mt-3 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
        Your smart shopping companion for finding the best deals online.
      </p>
    </header>
  );
}
