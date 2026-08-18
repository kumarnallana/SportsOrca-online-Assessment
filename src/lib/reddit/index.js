import { isMockMode } from './config';
import { fetchMockHotPosts } from './mock';
import { fetchApiHotPosts } from './api';

export async function getHotPosts(subreddit) {
  if (isMockMode()) {
    return fetchMockHotPosts(subreddit);
  } else {
    return fetchApiHotPosts(subreddit);
  }
}
