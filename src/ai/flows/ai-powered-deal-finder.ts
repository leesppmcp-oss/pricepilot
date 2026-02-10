'use server';

/**
 * @fileOverview An AI-powered deal finder flow that identifies potential money-saving offers.
 *
 * - findDeals - A function that handles the deal finding process for a given product and website.
 * - FindDealsInput - The input type for the findDeals function.
 * - FindDealsOutput - The return type for the findDeals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindDealsInputSchema = z.object({
  productName: z.string().describe('The name of the product to find deals for.'),
  websiteName: z.string().describe('The name of the website to search for deals on.'),
});
export type FindDealsInput = z.infer<typeof FindDealsInputSchema>;

const FindDealsOutputSchema = z.object({
  deals: z
    .array(z.string())
    .describe('A list of potential money-saving offers found on the website.'),
});
export type FindDealsOutput = z.infer<typeof FindDealsOutputSchema>;

export async function findDeals(input: FindDealsInput): Promise<FindDealsOutput> {
  return findDealsFlow(input);
}

const findDealsPrompt = ai.definePrompt({
  name: 'findDealsPrompt',
  input: {schema: FindDealsInputSchema},
  output: {schema: FindDealsOutputSchema},
  prompt: `You are an expert deal finder. Given the product name and website, you will identify potential money-saving offers, such as coupon codes, bundle deals, or discounted shipping.

Product Name: {{{productName}}}
Website: {{{websiteName}}}

Identify all possible deals from the website. Return each deal as a separate string in an array. Do not include deals that are not related to the product name or website.
`,
});

const findDealsFlow = ai.defineFlow(
  {
    name: 'findDealsFlow',
    inputSchema: FindDealsInputSchema,
    outputSchema: FindDealsOutputSchema,
  },
  async input => {
    const {output} = await findDealsPrompt(input);
    return output!;
  }
);
