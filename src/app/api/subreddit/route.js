import { NextResponse } from 'next/server';
import { normalizeSubredditName } from '@/lib/reddit/normalize';
import { getHotPosts } from '@/lib/reddit/index';
import { RedditApiError } from '@/lib/reddit/errors';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  const normalizedName = normalizeSubredditName(name);

  if (!normalizedName) {
    return NextResponse.json(
      { error: true, code: 'INVALID_SUBREDDIT', message: 'Invalid or missing subreddit name.' },
      { status: 400 }
    );
  }

  try {
    const data = await getHotPosts(normalizedName);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Error /subreddit]', error);

    if (error instanceof RedditApiError) {
      return NextResponse.json(
        { error: true, code: error.code, message: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { error: true, code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
