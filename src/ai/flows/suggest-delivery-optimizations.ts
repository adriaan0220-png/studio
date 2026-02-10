'use server';
/**
 * @fileOverview Provides delivery optimization suggestions based on truck availability and route efficiency.
 *
 * - suggestDeliveryOptimizations - A function that suggests delivery optimizations.
 * - SuggestDeliveryOptimizationsInput - The input type for the suggestDeliveryOptimizations function.
 * - SuggestDeliveryOptimizationsOutput - The return type for the suggestDeliveryOptimizations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDeliveryOptimizationsInputSchema = z.object({
  deliveryLocation: z
    .string()
    .describe('La ubicació de lliurament desitjada per a la mercaderia.'),
  productType: z.string().describe('El tipus de producte líquid que es lliura.'),
  truckType: z.string().describe('El tipus de camió utilitzat per al lliurament.'),
  currentCost: z.number().describe('El cost estimat actual del lliurament.'),
});
export type SuggestDeliveryOptimizationsInput = z.infer<
  typeof SuggestDeliveryOptimizationsInputSchema
>;

const SuggestDeliveryOptimizationsOutputSchema = z.object({
  optimizations: z
    .string()
    .describe(
      "Una llista de suggeriments per optimitzar el lliurament, considerant factors com la disponibilitat de camions i l'eficiència de la ruta, per reduir costos."
    ),
});
export type SuggestDeliveryOptimizationsOutput = z.infer<
  typeof SuggestDeliveryOptimizationsOutputSchema
>;

export async function suggestDeliveryOptimizations(
  input: SuggestDeliveryOptimizationsInput
): Promise<SuggestDeliveryOptimizationsOutput> {
  return suggestDeliveryOptimizationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDeliveryOptimizationsPrompt',
  input: {schema: SuggestDeliveryOptimizationsInputSchema},
  output: {schema: SuggestDeliveryOptimizationsOutputSchema},
  prompt: `Ets un expert en logística i optimització de costos de transport. Basant-te en la ubicació de lliurament, el tipus de producte, el tipus de camió i el cost actual, suggereix maneres d'optimitzar el lliurament per reduir costos.

Ubicació de lliurament: {{{deliveryLocation}}}
Tipus de producte: {{{productType}}}
Tipus de camió: {{{truckType}}}
Cost actual: {{{currentCost}}}

Considera factors com la disponibilitat de camions, l'eficiència de la ruta, els costos de combustible i els possibles descomptes. Proporciona suggeriments específics i accionables.

Optimitzacions:`,
});

const suggestDeliveryOptimizationsFlow = ai.defineFlow(
  {
    name: 'suggestDeliveryOptimizationsFlow',
    inputSchema: SuggestDeliveryOptimizationsInputSchema,
    outputSchema: SuggestDeliveryOptimizationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
