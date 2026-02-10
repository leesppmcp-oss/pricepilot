'use server';

import type { SearchResult } from '@/lib/types';
import { WEBSITES } from '@/lib/constants';
import { findDeals } from '@/ai/flows/ai-powered-deal-finder';

export async function searchPricesAction(data: {
  productName: string;
  websites: string[];
}): Promise<SearchResult[]> {
  // Simulate network delay for a better user experience
  await new Promise(resolve => setTimeout(resolve, 1500));

  const results: SearchResult[] = data.websites.map(websiteId => {
    const website = WEBSITES.find(w => w.id === websiteId);
    if (!website) return null;

    // Simulate that not all websites might have the product
    const hasResult = Math.random() > 0.1; // 90% chance of finding a result

    return {
      websiteName: website.name,
      productName: data.productName,
      price: hasResult
        ? parseFloat((Math.random() * 200 + 50).toFixed(2))
        : null,
      url: `https://example.com/search?q=${encodeURIComponent(
        data.productName
      )}&site=${websiteId}`,
    };
  }).filter((r): r is SearchResult => r !== null);

  return results;
}

export async function findWebsiteDealsAction(
  productName: string,
  websiteName: string
) {
  try {
    const result = await findDeals({ productName, websiteName });
    // Simulate some empty results for variety
    if (Math.random() > 0.8) {
       return { deals: [] };
    }
    return { deals: result.deals.slice(0, Math.floor(Math.random() * 3) + 1) }; // Return 1 to 3 deals
  } catch (error) {
    console.error('AI Deal Finder Error:', error);
    return { error: 'Could not fetch deals at this time. Please try again later.' };
  }
}
