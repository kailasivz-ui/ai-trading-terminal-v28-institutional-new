export default function handler(req, res) {
  res.status(200).json({ status: 'ok', backend: 'live', version: 'V28', mode: process.env.UPSTOX_ACCESS_TOKEN ? 'upstox-ready' : 'demo-until-upstox-token', time: new Date().toISOString() });
}
