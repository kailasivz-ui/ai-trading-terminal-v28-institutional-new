const data = require('./_data');
module.exports = (req,res)=>{res.setHeader('Access-Control-Allow-Origin','*');res.status(200).json(data.intraday((req.query&&req.query.side)||'bullish'));};
