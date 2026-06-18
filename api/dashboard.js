import { demoMarket } from './_engine.js';
export default async function handler(req,res){
  const market = demoMarket();
  res.status(200).json({
    version:'V28', live: !!process.env.UPSTOX_ACCESS_TOKEN, market,
    bias: { nifty: market.pcr >= 1.04 ? 'Bullish above VWAP' : 'Range / wait', banknifty: 'Trade after ORB confirmation', sensex: 'Expiry mode: use strict SL' },
    riskMode: market.vix > 15 ? 'High' : 'Medium',
    plan: 'Trade only with VWAP + EMA + RSI + Volume + OI confirmation. Avoid first 5 minutes. Use 1:1.5 RR minimum.'
  });
}
