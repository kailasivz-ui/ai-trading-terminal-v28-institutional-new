const now = () => new Date().toISOString();

function demoMarket() {
  const t = Date.now();
  const wave = Math.sin(t / 60000);
  const nifty = Math.round((24850 + wave * 35) * 100) / 100;
  const banknifty = Math.round((56200 + wave * 90) * 100) / 100;
  const sensex = Math.round((81500 + wave * 120) * 100) / 100;
  const vix = Math.round((13.8 + wave * 0.6) * 100) / 100;
  const pcr = Math.round((1.02 + wave * 0.08) * 100) / 100;
  return { nifty, banknifty, sensex, vix, pcr, timestamp: now(), source: 'demo-engine' };
}

function confidence(parts) {
  const v = parts.reduce((a,b)=>a+b,0) / parts.length;
  return Math.max(45, Math.min(94, Math.round(v)));
}

function stockRows(type='bullish') {
  const bullish = [
    ['HAL', 78, 'VWAP + EMA + Defence strength'],
    ['BEL', 76, 'RSI above 55 + volume'],
    ['BHEL', 73, 'Power theme + MACD positive'],
    ['L&T', 72, 'Trend continuation above VWAP'],
    ['CGPOWER', 71, 'EMA support + sector momentum']
  ];
  const bearish = [
    ['INFY', 72, 'Below VWAP + weak RSI'],
    ['WIPRO', 69, 'IT relative weakness'],
    ['HDFCBANK', 67, 'Range breakdown watch'],
    ['TATAMOTORS', 66, 'MACD negative watch'],
    ['ADANIENT', 64, 'High beta risk-off watch']
  ];
  const base = type === 'bearish' ? bearish : bullish;
  return base.map((r, i) => ({
    symbol: r[0], confidence: r[1], reason: r[2],
    entry: type === 'bearish' ? 'Below day low / VWAP rejection' : 'Above ORB high / VWAP hold',
    stopLoss: type === 'bearish' ? 'Above VWAP or 0.6% SL' : 'Below VWAP or 0.6% SL',
    target: '1:1.5 RR, trail after T1',
    filters: ['VWAP','EMA','RSI','MACD','Volume']
  }));
}

function optionsPlan(index='NIFTY') {
  const m = demoMarket();
  const spot = index === 'BANKNIFTY' ? m.banknifty : index === 'SENSEX' ? m.sensex : m.nifty;
  const step = index === 'NIFTY' ? 50 : 100;
  const atm = Math.round(spot / step) * step;
  const bias = m.pcr > 1.04 ? 'Bullish' : m.pcr < 0.96 ? 'Bearish' : 'Range';
  return {
    index, spot, bias,
    nakedCall: {
      action: bias === 'Bullish' ? 'BUY CE' : 'WAIT', strike: atm + step,
      entry: 'Only above VWAP + 9EMA and RSI > 55', stopLoss: '25% premium SL or spot below VWAP', target: '40–60% premium move', confidence: confidence([78,72,74])
    },
    nakedPut: {
      action: bias === 'Bearish' ? 'BUY PE' : 'WAIT', strike: atm - step,
      entry: 'Only below VWAP + 9EMA and RSI < 45', stopLoss: '25% premium SL or spot above VWAP', target: '40–60% premium move', confidence: confidence([70,69,72])
    },
    filters: { pcr: m.pcr, vix: m.vix, oi: 'Add live Upstox token for actual OI', thetaRisk: 'High near expiry' },
    timestamp: m.timestamp
  };
}

async function upstox(path) {
  const token = process.env.UPSTOX_ACCESS_TOKEN;
  if (!token) return null;
  const url = `https://api.upstox.com${path}`;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }});
  if (!r.ok) throw new Error(`Upstox ${r.status}`);
  return r.json();
}

export { demoMarket, stockRows, optionsPlan, upstox, now };
