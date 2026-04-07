
// config.js — API Keys & App Constants


export const CONFIG = {
  // --- API Keys ---
 //Weather API 
  // CoinGecko: no key needed for public endpoints
EXCHANGERATE_API_KEY: '66fbbb9ba6475aaf5199366e',
WEATHERAPI_KEY: '656970e136eab0350ba1a9e1447b3c92',  // ← add this line

  // --- Default Location (Accra, Ghana) ---
  DEFAULT_LAT: 5.6037,
  DEFAULT_LNG: -0.1870,
  DEFAULT_CITY: 'Accra',
  DEFAULT_COUNTRY: 'GH',

  // --- Cache TTLs (milliseconds) ---
  CACHE_TTL: {
    weather:  30 * 60 * 1000,  // 30 minutes
    currency: 60 * 60 * 1000,  // 1 hour
    crypto:   5  * 60 * 1000,  // 5 minutes
    fuel:     24 * 60 * 60 * 1000, // 24 hours (manual data)
    stocks:   24 * 60 * 60 * 1000, // 24 hours (manual data)
  },

  // --- API Base URLs ---
  URLS: {
    weather:  'https://api.open-meteo.com/v1/forecast',
    geocode:  'https://geocoding-api.open-meteo.com/v1/search',
    currency: 'https://v6.exchangerate-api.com/v6',
    crypto:   'https://api.coingecko.com/api/v3',
  },

  // --- FX Pairs to display (vs GHS) ---
  FX_PAIRS: [
    { code: 'USD', name: 'US Dollar',      flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro',           flag: '🇪🇺' },
    { code: 'GBP', name: 'Pound Sterling', flag: '🇬🇧' },
    { code: 'CNY', name: 'Chinese Yuan',   flag: '🇨🇳' },
    { code: 'NGN', name: 'Naira',          flag: '🇳🇬' },
    { code: 'XOF', name: 'CFA Franc',      flag: '🇨🇮' },
  { code: 'CAD', name: 'Canadian Dollar',  flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar',flag: '🇦🇺' },
  { code: 'ZAR', name: 'South African Rand',flag: '🇿🇦' },
  { code: 'INR', name: 'Indian Rupee',     flag: '🇮🇳' },
  { code: 'JPY', name: 'Japanese Yen',     flag: '🇯🇵' },
  { code: 'AED', name: 'UAE Dirham',       flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal',      flag: '🇸🇦' },
  { code: 'XAF', name: 'Central African CFA', flag: '🇨🇲' },
  { code: 'MAD', name: 'Moroccan Dirham',  flag: '🇲🇦' },
  { code: 'KES', name: 'Kenyan Shilling',  flag: '🇰🇪' },
  { code: 'EGP', name: 'Egyptian Pound',   flag: '🇪🇬' },
  
  ],

  // --- Crypto coins to display ---
  CRYPTO_IDS: ['bitcoin', 'ethereum', 'tether', 'solana', 'bnb','cardano', 'ripple', 'dogecoin', 'litecoin',
  'polkadot', 'chainlink', 'uniswap', 'avalanche-2',
  'stellar', 'tron', 'shiba-inu', 'pepe'],

  // --- Weather code → emoji map ---
  WEATHER_ICONS: {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️', 48: '🌫️',
    51: '🌦️', 53: '🌦️', 55: '🌧️',
    61: '🌧️', 63: '🌧️', 65: '🌧️',
    80: '🌦️', 81: '🌧️', 82: '⛈️',
    95: '⛈️', 96: '⛈️', 99: '⛈️',
  },

  WEATHER_DESCS: {
    0: 'Clear sky', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Freezing fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Heavy drizzle',
    61: 'Light rain', 63: 'Moderate rain', 65: 'Heavy rain',
    80: 'Rain showers', 81: 'Heavy showers', 82: 'Violent showers',
    95: 'Thunderstorm', 96: 'Thunderstorm + hail', 99: 'Heavy thunderstorm',
  },
};
