import Sentiment from 'sentiment';

// We initialize sentiment instance lazily or just once here.
const sentimentInstance = new Sentiment();

export function analyzeTitle(title) {
  if (!title) {
    return {
      score: 0,
      comparative: 0,
      label: 'neutral'
    };
  }

  const result = sentimentInstance.analyze(title);
  
  let label = 'neutral';
  if (result.score > 0) label = 'positive';
  else if (result.score < 0) label = 'negative';

  return {
    score: result.score,
    comparative: result.comparative,
    label
  };
}

export function classifyVibe(positivePercent, negativePercent) {
  if (positivePercent >= 50) return 'Mostly Positive';
  if (negativePercent >= 50) return 'Mostly Negative';
  return 'Mixed Sentiment';
}

export function aggregateSentiment(postsWithSentiment) {
  let positive = 0;
  let neutral = 0;
  let negative = 0;
  let totalScore = 0;
  let totalRedditScore = 0;

  const total = postsWithSentiment.length;

  if (total === 0) {
    return {
      total: 0,
      positive: 0,
      neutral: 0,
      negative: 0,
      positivePercent: 0,
      neutralPercent: 0,
      negativePercent: 0,
      averageScore: 0,
      averageRedditScore: 0,
      vibe: 'No Data'
    };
  }

  for (const post of postsWithSentiment) {
    if (post.sentiment.label === 'positive') positive++;
    else if (post.sentiment.label === 'negative') negative++;
    else neutral++;

    totalScore += post.sentiment.score;
    totalRedditScore += post.score;
  }

  const positivePercent = Math.round((positive / total) * 100);
  const negativePercent = Math.round((negative / total) * 100);
  // Ensure invariant: positive + neutral + negative = 100
  const neutralPercent = 100 - positivePercent - negativePercent;

  return {
    total,
    positive,
    neutral,
    negative,
    positivePercent,
    neutralPercent,
    negativePercent,
    averageScore: Number((totalScore / total).toFixed(2)),
    averageRedditScore: Math.round(totalRedditScore / total),
    vibe: classifyVibe(positivePercent, negativePercent)
  };
}
