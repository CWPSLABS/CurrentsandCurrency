// ============================================
// js/api/currency.js — ExchangeRate-API
// GitHub Pages version — direct frontend call
// Key is locked to your domain on the API dashboard
// ============================================
import { CONFIG } from '../config.js';
import { cache } from '../utils/cache.js';

export async function fetchCurrencyRates() {
  const cacheKey = 'currency_ghs';
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const url = `https://v6.exchangerate-api.com/v6/${CONFIG.EXCHANGERATE_API_KEY}/latest/GHS`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Currency fetch failed: ${res.status}`);

  const data = await res.json();
  if (data.result !== 'success') throw new Error(data['error-type']);

  cache.set(cacheKey, data, CONFIG.CACHE_TTL.currency);
  return data;
}

export function getRate(conversionRates, targetCurrency) {
  return conversionRates[targetCurrency] ?? null;
}
