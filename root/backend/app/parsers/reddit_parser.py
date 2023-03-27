import os
from datetime import datetime
from typing import List

import praw
import prawcore
from dotenv import load_dotenv

from root.backend.app.utils import Post

load_dotenv()


class RedditAPIError(Exception):
    pass


class RedditNotFoundError(Exception):
    pass


reddit = praw.Reddit(
    client_id=os.environ.get("REDDIT_CLIENT_ID"),
    client_secret=os.environ.get("REDDIT_CLIENT_SECRET"),
    user_agent="testscript by u/fakebot3",
)


def is_image_submission(submission) -> bool:
    image_domains = ['i.redd.it', 'imgur.com']
    return any(domain in submission.url for domain in image_domains)


def get_image_from_submission(submission) -> list:
    if is_image_submission(submission):
        return [image["source"]["url"] for image in submission.preview["images"]]
    elif hasattr(submission, 'media_metadata') and submission.media_metadata:
        return [submission.media_metadata[key]['s']['u'] for key in submission.media_metadata]
    else:
        return []


def get_reddit_posts(subreddit: str, limit: int = 10) -> List[Post]:
    results = []
    # Add limit submissions to the list using reddit
    try:
        for submission in reddit.subreddit(subreddit).hot(limit=limit):
            results.append(Post(
                title=submission.title,
                content=submission.selftext,
                author=submission.author.name,
                # If there are no images in preview, return an empty list
                images=get_image_from_submission(submission),
                likes=submission.score,
                comments=submission.num_comments,
                url=submission.permalink,
                date=datetime.fromtimestamp(submission.created_utc),
            )._asdict())
        return results
    except prawcore.exceptions.NotFound:
        raise RedditNotFoundError(f"Subreddit {subreddit} not found")
    except prawcore.exceptions.Redirect:
        raise RedditNotFoundError(f"Subreddit {subreddit} not found")
    except Exception as e:
        raise RedditAPIError(f"Error fetching Reddit posts: {str(e)}")
