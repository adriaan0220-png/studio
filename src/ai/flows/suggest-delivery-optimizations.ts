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
    .describe('The desired delivery location for the goods.'),
  productType: z.string().describe('The type of liquid product being delivered.'),
  truckType: z.string().describe('The type of truck being used for delivery.'),
  currentCost: z.number().describe('The current estimated cost of delivery.'),
});
export type SuggestDeliveryOptimizationsInput = z.infer<
  typeof SuggestDeliveryOptimizationsInputSchema
>;

const SuggestDeliveryOptimizationsOutputSchema = z.object({
  optimizations: z
    .string()
    .describe(
      'A list of suggestions for optimizing the delivery, considering factors such as truck availability and route efficiency, to reduce costs.'
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
  prompt: `You are an expert in logistics and transportation cost optimization. Based on the delivery location, product type, truck type, and current cost, suggest ways to optimize the delivery to reduce costs.\n\nDelivery Location: {{{deliveryLocation}}}\nProduct Type: {{{productType}}}\nTruck Type: {{{truckType}}}\nCurrent Cost: {{{currentCost}}}\n\nConsider factors such as truck availability, route efficiency, fuel costs, and potential discounts. Provide specific, actionable suggestions.\n\nOptimizations:`,
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
