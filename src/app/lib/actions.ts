'use server';

import { estimateTransportCost as estimateCost, type EstimateTransportCostInput } from '@/ai/flows/transport-cost-estimate';
import { suggestDeliveryOptimizations as suggestOptimizations, type SuggestDeliveryOptimizationsInput } from '@/ai/flows/suggest-delivery-optimizations';

export async function estimateTransportCost(input: EstimateTransportCostInput) {
  try {
    const data = await estimateCost(input);
    return { data };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'S\'ha produït un error desconegut en estimar el cost.' };
  }
}

export async function suggestDeliveryOptimizations(input: SuggestDeliveryOptimizationsInput) {
  try {
    const data = await suggestOptimizations(input);
    return { data };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'S\'ha produït un error desconegut en generar els suggeriments.' };
  }
}
