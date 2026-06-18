# AI Trading Terminal V28 Institutional

## Deploy on Vercel
1. Extract this ZIP.
2. Copy all files to your GitHub repository root.
3. Commit and push.
4. Vercel → New Project → Import repo → Deploy.
5. Test: `/api/health`.

## Important folder structure
`index.html` must be at the repository root, not inside another folder.

Correct:
```
index.html
api/health.js
api/dashboard.js
package.json
vercel.json
```

Wrong:
```
ai-trading-terminal-v28-institutional/index.html
```

## Upstox live data
Add these in Vercel → Project → Settings → Environment Variables:
```
UPSTOX_ACCESS_TOKEN=your_token
UPSTOX_API_KEY=your_key
UPSTOX_API_SECRET=your_secret
```
Then redeploy.

Without Upstox token, the app runs in demo engine mode.

## API tests
- `/api/health`
- `/api/dashboard`
- `/api/intraday?type=bullish`
- `/api/intraday?type=bearish`
- `/api/options?index=NIFTY`
- `/api/strategy?name=macd`
