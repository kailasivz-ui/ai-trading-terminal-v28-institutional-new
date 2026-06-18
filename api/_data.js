function now(){ return new Date().toISOString(); }
function jitter(base, pct=0.003){ return +(base*(1+(Math.random()-0.5)*pct)).toFixed(2); }
function health(){ return {status:'ok', version:'V29', mode: process.env.UPSTOX_ACCESS_TOKEN ? 'upstox-ready' : 'demo-live-ready', time: now()}; }
function dashboard(){
  const nifty=jitter(23500,0.006), bank=jitter(50500,0.006), sensex=jitter(77000,0.006);
  return {status:'ok', version:'V29', mode: process.env.UPSTOX_ACCESS_TOKEN ? 'upstox-ready' : 'demo-live-ready', updatedAt: now(), market:{nifty, banknifty:bank, sensex, indiaVix:jitter(14.2,0.08), pcr:jitter(1.05,0.1)}, bias:{nifty:nifty>23450?'Bullish above VWAP':'Range / Wait', banknifty:bank>50400?'Buy dips':'Range / Wait', sensex:sensex>76800?'Positive':'Neutral'}, risk:'Medium'};
}
const bullish=['HAL','BEL','BHEL','L&T','CGPOWER','NTPC','POWERGRID','TATAPOWER'];
const bearish=['INFY','WIPRO','HCLTECH','TECHM','TCS','HDFCBANK','ICICIBANK'];
function intraday(side='bullish'){
 const list=(side==='bearish'?bearish:bullish).slice(0,6).map((s,i)=>{const p=jitter(500+i*120,0.02); return {stock:s, action:side==='bearish'?'SELL/PUT bias':'BUY/CALL bias', entry:p, stopLoss: side==='bearish'? +(p*1.008).toFixed(2): +(p*0.992).toFixed(2), target1: side==='bearish'? +(p*0.988).toFixed(2): +(p*1.012).toFixed(2), target2: side==='bearish'? +(p*0.978).toFixed(2): +(p*1.022).toFixed(2), confidence: 78+i%3*4, filters:['VWAP','EMA','RSI','MACD','Volume']};});
 return {status:'ok', side, updatedAt:now(), data:list};
}
function options(symbol='NIFTY'){
 const spot=symbol==='BANKNIFTY'?jitter(50500,0.004):symbol==='SENSEX'?jitter(77000,0.004):jitter(23500,0.004); const step=symbol==='BANKNIFTY'?100:50; const atm=Math.round(spot/step)*step;
 return {status:'ok', symbol, updatedAt:now(), spot, pcr:jitter(1.06,0.08), calls:{action:'BUY CE only above VWAP + RSI>55', strike:atm+step, entry:'Use live premium after breakout', stopLoss:'25% premium SL', target:'40-60% premium target', confidence:82}, puts:{action:'BUY PE only below VWAP + RSI<45', strike:atm-step, entry:'Use live premium after breakdown', stopLoss:'25% premium SL', target:'40-60% premium target', confidence:78}, nakedCall:{action:'Only for expert/risk-controlled traders', strike:atm+step*3, risk:'High, use hedge/SL', confidence:62}};
}
function strategy(type='macd'){
 const rows=['RELIANCE','SBIN','AXISBANK','TATASTEEL','M&M','ADANIPORTS'].map((s,i)=>({stock:s, setup:type.toUpperCase(), signal:i%2?'Wait for retest':'Fresh trigger', entry:jitter(800+i*90,0.02), sl:'ATR based', confidence:72+i*3}));
 return {status:'ok', type, updatedAt:now(), data:rows};
}
module.exports={health,dashboard,intraday,options,strategy};
