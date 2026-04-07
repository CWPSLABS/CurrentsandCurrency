
// modules/cryptoWidget.js

import { fetchCryptoPrices } from '../api/crypto.js';
import { formatUSD, formatChange } from '../utils/formatter.js';
import { renderError } from '../utils/errorHandler.js';

const CRYPTO_ICONS = {
  bitcoin: '₿',
  ethereum: 'Ξ',
  tether: '₮',
  solana: '◎',
  bnb: 'B',
};

export async function initCryptoWidget() {
  const container = document.getElementById('crypto-widget');

  try {
    const coins = await fetchCryptoPrices();

    container.innerHTML = `
      <div class="crypto-list">
        ${coins.map(coin => {
          const pct = coin.price_change_percentage_24h ?? 0;
          const dir = pct >= 0 ? 'up' : 'down';
          const icon = CRYPTO_ICONS[coin.id] ?? '🪙';
          return `
            <div class="crypto-item">
              <div class="crypto-left">
                <div class="crypto-icon">${icon}</div>
                <div>
                  <div class="crypto-name">${coin.name}</div>
                  <div class="crypto-symbol">${coin.symbol.toUpperCase()}</div>
                </div>
              </div>
              <div class="crypto-right">
                <div class="crypto-price">${formatUSD(coin.current_price)}</div>
                <div class="crypto-change ${dir}">${formatChange(pct)}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    return coins;
  } catch (err) {
    console.error('[Crypto]', err);
    renderError('crypto-widget', 'Crypto prices unavailable', initCryptoWidget);
    return [];
  }
}
