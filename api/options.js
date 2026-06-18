import { optionsPlan } from './_engine.js';
export default function handler(req,res){
 const index=(req.query.index||'NIFTY').toUpperCase();
 res.status(200).json(optionsPlan(index));
}
