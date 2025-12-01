'use server';

/**
 * @fileOverview An AI agent to estimate transportation costs for liquid product orders.
 *
 * - estimateTransportCost - A function that estimates the transportation cost.
 * - EstimateTransportCostInput - The input type for the estimateTransportCost function.
 * - EstimateTransportCostOutput - The return type for the estimateTransportCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateTransportCostInputSchema = z.object({
  deliveryLocation: z
    .string()
    .describe('The desired delivery location for the liquid product order.'),
  productType: z.string().describe('The type of liquid product being transported.'),
  quantity: z.number().describe('The quantity of the liquid product being transported.'),
});
export type EstimateTransportCostInput = z.infer<typeof EstimateTransportCostInputSchema>;

const EstimateTransportCostOutputSchema = z.object({
  estimatedCost: z
    .number()
    .describe('The estimated transportation cost in Euros for the liquid product order.'),
  breakdown: z
    .string()
    .describe('A breakdown of the factors contributing to the estimated cost.'),
});
export type EstimateTransportCostOutput = z.infer<typeof EstimateTransportCostOutputSchema>;

export async function estimateTransportCost(
  input: EstimateTransportCostInput
): Promise<EstimateTransportCostOutput> {
  return estimateTransportCostFlow(input);
}

const estimateTransportCostPrompt = ai.definePrompt({
  name: 'estimateTransportCostPrompt',
  input: {schema: EstimateTransportCostInputSchema},
  output: {schema: EstimateTransportCostOutputSchema},
  prompt: `You are a transportation cost estimator for EB Trans Ibérica, a liquid product transportation company.

  Given the delivery location, product type, and quantity, estimate the transportation cost in Euros.
  Consider factors such as distance, fuel costs, truck availability, and any other relevant factors.
  Provide a breakdown of the factors contributing to the estimated cost.

  Delivery Location: {{{deliveryLocation}}}
  Product Type: {{{productType}}}
  Quantity: {{{quantity}}}

  Respond with the estimated cost and a detailed breakdown.
  Ensure the estimatedCost is in Euros.
  `,
});

const estimateTransportCostFlow = ai.defineFlow(
  {
    name: 'estimateTransportCostFlow',
    inputSchema: EstimateTransportCostInputSchema,
    outputSchema: EstimateTransportCostOutputSchema,
  },
  async input => {
    const {output} = await estimateTransportCostPrompt(input);
    return output!;
  }
);
