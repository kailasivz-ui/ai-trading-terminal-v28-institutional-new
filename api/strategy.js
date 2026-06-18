export default function handler(req,res){
 const name=(req.query.name||'macd').toLowerCase();
 const data = name === 'rsi' ? [
  {setup:'RSI 50 cross', direction:'Bullish', rule:'Entry when RSI crosses 50 upward and price holds VWAP', confidence:74},
  {setup:'RSI 60 momentum', direction:'Bullish', rule:'Use pullback to 9/20 EMA when RSI stays above 60', confidence:78},
  {setup:'RSI 45 breakdown', direction:'Bearish', rule:'Short/PE when RSI below 45 and VWAP rejection', confidence:71}
 ] : [
  {setup:'MACD bullish crossover', direction:'Bullish', rule:'MACD line above signal + histogram green + VWAP hold', confidence:76},
  {setup:'MACD zero-line reclaim', direction:'Bullish', rule:'MACD crosses above zero with volume spike', confidence:79},
  {setup:'MACD bearish crossover', direction:'Bearish', rule:'MACD below signal + price below VWAP', confidence:72}
 ];
 res.status(200).json({strategy:name, rows:data});
}
