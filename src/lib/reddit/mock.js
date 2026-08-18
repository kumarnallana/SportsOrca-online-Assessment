import { normalizePost } from './normalize';

const MOCK_THEMES = [
  { title: 'I finally built my first React app! Amazing!', sentiment: 'positive' },
  { title: 'The new JS framework is amazing and fast', sentiment: 'positive' },
  { title: 'Really love the community support here', sentiment: 'positive' },
  { title: 'Learning to code has changed my life for the better', sentiment: 'positive' },
  { title: 'Great resources for beginners in webdev', sentiment: 'positive' },
  { title: 'A discussion about routing', sentiment: 'neutral' },
  { title: 'How to fetch data in Next.js', sentiment: 'neutral' },
  { title: 'Comparing two different database paradigms', sentiment: 'neutral' },
  { title: 'List of top 10 programming languages', sentiment: 'neutral' },
  { title: 'This bug is absolutely driving me crazy, hate it', sentiment: 'negative' },
  { title: 'Why is the documentation so terrible?', sentiment: 'negative' },
  { title: 'I am so frustrated with CSS right now', sentiment: 'negative' },
  { title: 'Worst experience trying to deploy an app', sentiment: 'negative' },
  { title: 'The API rate limits are ridiculous and broken', sentiment: 'negative' },
];

export async function fetchMockHotPosts(subreddit) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const posts = [];
  for (let i = 0; i < 50; i++) {
    const theme = MOCK_THEMES[i % MOCK_THEMES.length];
    
    // Create some variation
    const rawPost = {
      id: `mock_${i}_${Date.now()}`,
      title: `${theme.title} [${i}]`,
      author: `mock_user_${i}`,
      score: Math.floor(Math.random() * 5000),
      num_comments: Math.floor(Math.random() * 500),
      permalink: `/r/${subreddit}/comments/mock_${i}/mock_post/`,
      url: `https://reddit.com/r/${subreddit}/comments/mock_${i}/mock_post/`,
      created_utc: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400),
      thumbnail: null,
      subreddit: subreddit
    };
    
    posts.push(normalizePost(rawPost));
  }

  return {
    subreddit,
    source: 'mock',
    count: posts.length,
    posts
  };
}
