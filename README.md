# The Subreddit Vibe Check

Understand the mood behind the hottest conversations on Reddit.

## Overview
This is a polished full-stack web application that fetches the hottest posts from a given subreddit, performs client-side sentiment analysis on their titles, and provides a beautiful dashboard summarizing the "vibe" of the community.

## Features
- **Premium SaaS UI/UX:** Features a custom D3.js Linear Vibe Meter, smooth staggered Framer Motion entrances, layoutId filters, and a custom layered Slate dark theme.
- **Official Reddit Integration:** Connects to Reddit using the official Data API (OAuth2 Client Credentials flow).
- **Client-Side Sentiment Analysis:** Uses AFINN-based vocabulary to score the sentiment of titles securely on the client.
- **Stale Data Protection:** Seamlessly transitions between subreddits using `AbortController` and stale-data caching to ensure honest loading states.
- **Shareable URLs:** The application dynamically syncs state with the URL (`/?subreddit=reactjs`) for easily shareable analysis.
- **Demo Mode:** Built-in synthetic data provider for local development without Reddit API credentials.

## Architecture
```text
Browser (UI, Lenis Smooth Scroll, Framer Motion, D3.js)
  ↓ HTTP GET /api/subreddit
Next.js Route Handler (Validation, Provider Selection)
  ↓
Reddit Provider (OAuth Authentication, Normalization)
  ↓
Normalized Data
  ↓
Client Sentiment Analysis (sentiment library)
  ↓
Dashboard (Animated Numbers, Aggregations, List)
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

## Reviewer Instructions: Reddit API Integration
This application connects using the **OAuth2 Client Credentials** flow as mandated by the current 2026 Reddit Developer Policy. 
**To fully evaluate the real-time efficiency and official API implementation of this application, please use your own official Reddit Developer API credentials.**

1. Go to `https://www.reddit.com/prefs/apps`.
2. Register an application (script).
3. Populate the following in your `.env` file:
   ```env
   REDDIT_CLIENT_ID=your_client_id
   REDDIT_CLIENT_SECRET=your_client_secret
   REDDIT_USER_AGENT=web:com.yourname.vibecheck:v1.0.0 (by /u/yourusername)
   ```
4. **Remove** `REDDIT_DATA_SOURCE=mock` from your `.env` file to disable Demo Mode.

The application will automatically detect your credentials, bypass the mock data, and hit the live Reddit OAuth servers in real-time.

## Demo Mode
Because Reddit API access requires approved credentials, a first-class **Demo Mode** is included for local UI testing.
Set `REDDIT_DATA_SOURCE=mock` in your `.env` (or leave your keys blank) to test the UI and sentiment analysis engine against synthetic tech posts.

## Running Locally
```bash
npm run dev
```
Open `http://localhost:3000`.

## Testing & Build
```bash
npm run lint
npm run build
npm run test:e2e  # Runs Playwright Automation Tests
```

## Playwright Automation
This repository includes a basic end-to-end automation suite using **Playwright**. It verifies that the core search mechanics and rendering work across Chromium.

To run the tests:
```bash
npx playwright install
npx playwright test
```

## Design Decisions
1. **Server-Side API Proxy:** Prevents leaking API credentials to the browser and handles CORS safely.
2. **Provider Abstraction:** Makes it trivial to swap between live Reddit data and mock data.
3. **Client-Side Sentiment:** Reduces server load; logic is fully deterministic.
4. **Normalized Data Contract:** The UI never sees messy raw Reddit JSON, preventing unexpected crashes if Reddit changes its payload shape.

## Limitations
- **Reddit API Restrictions:** True live mode requires an approved Reddit App registration per the Responsible Builder Policy.
- **Sentiment Model:** AFINN is a simple lexicon-based model, so sarcasm or deeply context-dependent nuances might not be perfectly scored.
