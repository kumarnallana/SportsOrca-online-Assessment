# The Subreddit Vibe Check

Understand the mood behind the hottest conversations on Reddit.

## Overview
This is a polished full-stack web application that fetches the hottest posts from a given subreddit, performs client-side sentiment analysis on their titles, and provides a beautiful dashboard summarizing the "vibe" of the community.

## Features
- **Official Reddit Integration:** Connects to Reddit using the official Data API (OAuth2 Client Credentials flow).
- **Client-Side Sentiment Analysis:** Uses AFINN-based vocabulary to score the sentiment of titles securely on the client.
- **Dynamic Dashboard:** D3.js powered donut chart, Framer Motion animations, and responsive layout.
- **Filtering & Sorting:** Filter posts by sentiment label (Positive, Neutral, Negative) and sort by Reddit Score or Sentiment Score.
- **Demo Mode:** Built-in synthetic data provider for local development without Reddit API credentials.

## Architecture
```text
Browser (UI, Lenis Smooth Scroll, Framer Motion)
  ↓ HTTP GET /api/subreddit
Next.js Route Handler (Validation, Provider Selection)
  ↓
Reddit Provider (OAuth Authentication, Normalization)
  ↓
Normalized Data
  ↓
Client Sentiment Analysis (sentiment library)
  ↓
Dashboard (D3 Charts, Aggregations, List)
```

## Tech Stack
- **Framework:** Next.js (App Router), React
- **Styling:** Tailwind CSS (v4), `clsx`, `tailwind-merge`
- **Animations:** Framer Motion, Lenis React (smooth scroll)
- **Data Viz:** D3.js
- **Icons:** Lucide React
- **NLP:** `sentiment`

## Prerequisites
- Node.js v20+
- npm v10+

## Installation
```bash
git clone <repository_url>
cd SportsOrca-online-Assessment
npm install
```

## Environment Configuration
Copy `.env.example` to `.env` and fill in your values.
```bash
cp .env.example .env
```

## Reddit Integration
This application connects using the **OAuth2 Client Credentials** flow as mandated by the current 2026 Reddit Developer Policy.
1. Go to `https://www.reddit.com/prefs/apps`.
2. Register an application.
3. Use the Client ID and Secret in your `.env`.

**Note:** Reddit's unauthenticated JSON endpoints have been disabled. Live data strictly requires registered OAuth credentials.

## Demo Mode
Because Reddit API access requires approved credentials, a first-class **Demo Mode** is included.
Set `REDDIT_DATA_SOURCE=mock` in your `.env` to test the UI and sentiment analysis engine against 50 realistic synthetic tech posts.

## Running Locally
```bash
npm run dev
```
Open `http://localhost:3000`.

## Testing & Build
```bash
npm run lint
npm run build
```

## Deployment
This app is ready to be deployed to Vercel:
1. Push to GitHub.
2. Import project in Vercel.
3. Configure Environment Variables (`REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, etc.).
4. Deploy.

## Project Structure
- `src/app/api/subreddit`: Next.js Route Handler for proxying requests.
- `src/lib/reddit`: Provider abstraction (mock vs api), normalization, and OAuth logic.
- `src/lib/sentiment.js`: NLP and aggregation engine.
- `src/components`: UI components (Search, PostList, SentimentOverview).

## Design Decisions
1. **Server-Side API Proxy:** Prevents leaking API credentials to the browser and handles CORS safely.
2. **Provider Abstraction:** Makes it trivial to swap between live Reddit data and mock data.
3. **Client-Side Sentiment:** Reduces server load; logic is fully deterministic.
4. **Normalized Data Contract:** The UI never sees messy raw Reddit JSON, preventing unexpected crashes if Reddit changes its payload shape.

## Limitations
- **Reddit API Restrictions:** True live mode requires an approved Reddit App registration per the Responsible Builder Policy.
- **Sentiment Model:** AFINN is a simple lexicon-based model, so sarcasm or deeply context-dependent nuances might not be perfectly scored.

## Future Improvements
- Add timeframe filters (Hot, Top All Time).
- Implement OAuth Authorization Code flow to fetch private user feeds.
- Visualize sentiment trends over time.
