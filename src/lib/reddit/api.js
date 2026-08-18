import { REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USER_AGENT } from './config';
import { normalizePost } from './normalize';
import { RedditApiError } from './errors';

let accessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiresAt) {
    return accessToken;
  }

  if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET) {
    throw new RedditApiError('Reddit API credentials are not configured.', 401, 'MISSING_CREDENTIALS');
  }

  const basicAuth = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64');

  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': REDDIT_USER_AGENT
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new RedditApiError(`Failed to authenticate with Reddit: ${response.statusText}`, response.status, 'AUTH_FAILED');
  }

  const data = await response.json();
  accessToken = data.access_token;
  // Subtracting 60 seconds as a buffer
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;

  return accessToken;
}

export async function fetchApiHotPosts(subreddit) {
  const token = await getAccessToken();

  // Bounded pagination: up to 3 pages to collect 50 valid posts
  const MAX_PAGES = 3;
  const TARGET_POSTS = 50;
  
  let allPosts = [];
  let after = null;

  for (let page = 0; page < MAX_PAGES; page++) {
    const url = new URL(`https://oauth.reddit.com/r/${subreddit}/hot`);
    url.searchParams.set('limit', '100'); // Ask for 100 to quickly filter out stickied/invalid
    if (after) {
      url.searchParams.set('after', after);
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': REDDIT_USER_AGENT
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new RedditApiError('Subreddit not found.', 404, 'SUBREDDIT_NOT_FOUND');
      }
      if (response.status === 429) {
        throw new RedditApiError('Reddit API rate limit exceeded.', 429, 'RATE_LIMIT');
      }
      if (response.status === 403) {
        throw new RedditApiError('Access forbidden. Application may not be registered.', 403, 'FORBIDDEN');
      }
      throw new RedditApiError(`Reddit API error: ${response.statusText}`, response.status, 'API_ERROR');
    }

    const data = await response.json();
    
    if (!data.data || !data.data.children) {
      break;
    }

    const children = data.data.children;
    for (const child of children) {
      // Skip stickied posts as they might skew the vibe
      if (child.data.stickied) continue;
      
      const post = normalizePost(child);
      if (post && post.title) {
        // Deduplicate
        if (!allPosts.find(p => p.id === post.id)) {
          allPosts.push(post);
        }
      }

      if (allPosts.length >= TARGET_POSTS) {
        break;
      }
    }

    if (allPosts.length >= TARGET_POSTS || !data.data.after) {
      break;
    }

    after = data.data.after;
  }

  // Ensure we only return up to 50
  allPosts = allPosts.slice(0, TARGET_POSTS);

  return {
    subreddit,
    source: 'reddit',
    count: allPosts.length,
    posts: allPosts
  };
}
