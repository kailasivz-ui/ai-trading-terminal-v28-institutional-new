# AI Trading Terminal V29 Institutional

Vercel-ready project with root index.html and serverless APIs.

## Deploy
1. Copy all files into GitHub repo root.
2. Commit and push.
3. Vercel import repo.
4. Framework: Other. Leave build/output blank.
5. Deploy.

## Test
- `/`
- `/api/health`
- `/api/dashboard`
- `/api/intraday?side=bullish`
- `/api/intraday?side=bearish`
- `/api/options?symbol=NIFTY`
- `/api/strategy?type=macd`

## Upstox live variables
Add these in Vercel → Settings → Environment Variables when ready:
- `UPSTOX_ACCESS_TOKEN`
- `UPSTOX_API_KEY`
- `UPSTOX_API_SECRET`

Without Upstox token, APIs return demo/live-ready data so deployment can be verified safely.
