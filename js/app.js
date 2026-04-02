// ============================================
// app.js — Main Entry Point
// ============================================
import { detectLocation }     from './modules/locationDetect.js';
import { initWeatherWidget }  from './modules/weatherWidget.js';
import { initCurrencyWidget } from './modules/currencyWidget.js';
import { initCryptoWidget }   from './modules/cryptoWidget.js';
import { formatTime }         from './utils/formatter.js';
import { cache }              from './utils/cache.js';

// ---- CLOCK ------------------------------------------------
function startClock() {
  const el = document.getElementById('current-time');
  if (!el) return;
  const tick = () => { el.textContent = formatTime(); };
  tick();
  setInterval(tick, 1000);
}

// ---- COPYRIGHT YEAR ---------------------------------------
function setCopyrightYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ---- TICKER -----------------------------------------------
function buildTicker(fxRows = [], cryptoCoins = []) {
  const track = document.getElementById('ticker-track');
  if (!track) return;

  const items = [
    ...fxRows.map(fx => ({
      symbol: `GHS/${fx.code}`,
      value: fx.ghsPerUnit?.toFixed(4) ?? '—',
      change: null,
    })),
    ...cryptoCoins.map(c => ({
      symbol: c.symbol?.toUpperCase(),
      value: `$${c.current_price?.toLocaleString()}`,
      change: c.price_change_percentage_24h,
    })),
  ];

  if (!items.length) {
    track.innerHTML = '<span style="color:var(--text-muted)">No data available</span>';
    return;
  }

  // Duplicate for seamless infinite scroll
  const html = [...items, ...items].map(item => {
    let changeHtml = '';
    if (item.change != null) {
      const dir = item.change >= 0 ? 'up' : 'down';
      const sign = item.change >= 0 ? '▲' : '▼';
      changeHtml = `<span class="ticker-change ${dir}">${sign} ${Math.abs(item.change).toFixed(2)}%</span>`;
    }
    return `
      <span class="ticker-item">
        <span class="ticker-symbol">${item.symbol}</span>
        <span class="ticker-value">${item.value}</span>
        ${changeHtml}
      </span>
    `;
  }).join('');

  track.innerHTML = html;
}

// ---- REFRESH BUTTONS --------------------------------------
function wireRefreshButtons(lat, lng, city) {
  document.querySelectorAll('.refresh-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const target = btn.dataset.target;
      btn.classList.add('spinning');

      cache.clear(`weather_${lat}_${lng}`);
      cache.clear('currency_ghs');
      cache.clear('crypto_prices');

      try {
        if (target === 'weather')  await initWeatherWidget(lat, lng, city);
        if (target === 'currency') await initCurrencyWidget();
        if (target === 'crypto')   await initCryptoWidget();
      } finally {
        btn.classList.remove('spinning');
      }
    });
  });
}

// ---- BOOT -------------------------------------------------
async function boot() {
  startClock();
  setCopyrightYear();

  // 1. Detect location
  const { lat, lng, city } = await detectLocation();

  // 2. Load all three widgets in parallel
  const [, fxRows, cryptoCoins] = await Promise.all([
    initWeatherWidget(lat, lng, city),
    initCurrencyWidget(),
    initCryptoWidget(),
  ]);

  // 3. Build ticker
  buildTicker(fxRows ?? [], cryptoCoins ?? []);

  // 4. Wire refresh buttons
  wireRefreshButtons(lat, lng, city);
}

document.addEventListener('DOMContentLoaded', boot);
