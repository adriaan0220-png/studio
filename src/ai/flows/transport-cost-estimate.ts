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
    .describe("La ubicació de lliurament desitjada per a la comanda de producte líquid."),
  productType: z.string().describe('El tipus de producte líquid que es transporta.'),
  quantity: z.number().describe('La quantitat de producte líquid que es transporta.'),
});
export type EstimateTransportCostInput = z.infer<typeof EstimateTransportCostInputSchema>;

const EstimateTransportCostOutputSchema = z.object({
  estimatedCost: z
    .number()
    .describe("El cost de transport estimat en euros per a la comanda de producte líquid."),
  breakdown: z
    .string()
    .describe('Un desglossament dels factors que contribueixen al cost estimat.'),
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
  prompt: `Ets un estimador de costos de transport per a Ttiko Trans, una empresa de transport de productes líquids.

  Donada la ubicació de lliurament, el tipus de producte i la quantitat, estima el cost de transport en euros.
  Considera factors com la distància, els costos de combustible, la disponibilitat de camions i qualsevol altre factor rellevant.
  Proporciona un desglossament dels factors que contribueixen al cost estimat.

  Ubicació de lliurament: {{{deliveryLocation}}}
  Tipus de producte: {{{productType}}}
  Quantitat: {{{quantity}}}

  Respon amb el cost estimat i un desglossament detallat.
  Assegura't que l'estimatedCost sigui en euros.
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
