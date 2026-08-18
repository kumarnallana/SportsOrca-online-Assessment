export class RedditApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'RedditApiError';
    this.status = status;
    this.code = code;
  }
}
