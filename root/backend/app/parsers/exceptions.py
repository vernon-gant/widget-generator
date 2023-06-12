class RedditAPIError(Exception):
    pass


class SubredditNotFoundError(Exception):
    pass


class PrivateSubredditError(Exception):
    pass