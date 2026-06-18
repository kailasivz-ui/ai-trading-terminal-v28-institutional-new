import { stockRows } from './_engine.js';
export default function handler(req,res){
 const type=(req.query.type||'bullish').toLowerCase();
 res.status(200).json({type, rows: stockRows(type), note:'Demo scanner until live Upstox market feed/watchlist logic is added.'});
}
