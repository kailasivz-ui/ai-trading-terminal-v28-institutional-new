const data = require('./_data');
module.exports = (req,res)=>{res.setHeader('Access-Control-Allow-Origin','*');res.status(200).json(data.strategy((req.query&&req.query.type)||'macd'));};
