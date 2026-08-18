export function normalizeSubredditName(input) {
  if (typeof input !== 'string') return null;
  
  let cleaned = input.trim();
  
  // Remove trailing slashes
  cleaned = cleaned.replace(/\/+$/, '');
  // Remove leading slashes
  cleaned = cleaned.replace(/^\/+/, '');
  
  // Handle r/ prefix
  if (cleaned.toLowerCase().startsWith('r/')) {
    cleaned = cleaned.substring(2);
  }
  
  if (!cleaned || cleaned.includes('/') || cleaned.includes(' ')) {
    return null;
  }
  
  return cleaned;
}

export function normalizePost(rawPost) {
  const data = rawPost.data || rawPost;
  
  return {
    id: data.id || Math.random().toString(36).substring(2, 9),
    title: data.title || '',
    author: data.author || null,
    score: typeof data.score === 'number' ? data.score : 0,
    numComments: typeof data.num_comments === 'number' ? data.num_comments : 0,
    permalink: data.permalink || '',
    url: data.url || null,
    createdUtc: typeof data.created_utc === 'number' ? data.created_utc : null,
    thumbnail: data.thumbnail && data.thumbnail.startsWith('http') ? data.thumbnail : null,
    subreddit: data.subreddit || ''
  };
}
