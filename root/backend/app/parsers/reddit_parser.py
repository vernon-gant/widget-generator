import os
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

import praw
import prawcore
from dotenv import load_dotenv
from flask import current_app as app
from praw.reddit import Submission
from typing import List

from .exceptions import SubredditNotFoundError, RedditAPIError, PrivateSubredditError
from ..utils import PostResource

load_dotenv()

reddit = praw.Reddit(
    client_id=os.environ.get("REDDIT_CLIENT_ID"),
    client_secret=os.environ.get("REDDIT_CLIENT_SECRET"),
    user_agent="testscript by u/fakebot3",
    ratelimit_seconds=1,
)


def is_resource(media_metadata: dict, key, resource) -> bool:
    return str(media_metadata[key]['e']).lower().find(resource) != -1


def is_url_submission(submission: Submission) -> bool:
    return len(str(submission.selftext).strip()) == 0 and \
        not (is_image_submission(submission) or is_video_submission(submission)) \
        and submission.url.startswith("http")


def is_video_submission(submission: Submission) -> bool:
    video_domains = ['v.redd.it']
    return any(domain in submission.url for domain in video_domains)


def has_embed_videos(submission: Submission) -> bool:
    return hasattr(submission, 'media_metadata') and submission.media_metadata and \
        any(is_resource(submission.media_metadata, key, 'video') for key in submission.media_metadata)


def get_video_from_submission(submission: Submission) -> list:
    if is_video_submission(submission):
        return [submission.secure_media["reddit_video"]["fallback_url"]]
    elif has_embed_videos(submission):
        return [submission.media_metadata[key]['dashUrl']
                for key in submission.media_metadata
                if is_resource(submission.media_metadata, key, 'video')
                ]
    else:
        return []


def is_image_submission(submission: Submission) -> bool:
    image_domains = ['i.redd.it', 'imgur.com']
    return any(domain in submission.url for domain in image_domains)


def has_embed_images(submission: Submission) -> bool:
    return hasattr(submission, 'media_metadata') and submission.media_metadata and \
        any(is_resource(submission.media_metadata, key, 'image') for key in submission.media_metadata)


def get_image_from_submission(submission: Submission) -> list:
    if is_image_submission(submission):
        return [image["source"]["url"] for image in submission.preview["images"]]
    elif has_embed_images(submission):
        return [submission.media_metadata[key]['s']['u']
                for key in submission.media_metadata
                if is_resource(submission.media_metadata, key, 'image')
                ]
    else:
        return []


def create_post_resource(submission):
    return PostResource(
        title=submission.title,
        content=submission.selftext if not is_url_submission(submission) else submission.url,
        author=submission.author.name if submission.author else "Unknown",
        # If there are no images in preview, return an empty list
        images=get_image_from_submission(submission),
        likes=submission.score,
        comments=submission.num_comments,
        url=submission.permalink,
        date=datetime.fromtimestamp(submission.created_utc),
        id=submission.id,
        video=get_video_from_submission(submission)
    )._asdict()


def get_reddit_posts(subreddit: str, limit: int) -> List[PostResource]:
    try:
        posts = reddit.subreddit(subreddit).hot(limit=limit)

        with ThreadPoolExecutor() as executor:
            results = list(executor.map(create_post_resource, posts))

        # Sort by date
        results.sort(key=lambda x: x["date"], reverse=True)
        app.logger.info(f"Successfully fetched {len(results)} posts from {subreddit}")
        return results
    except prawcore.exceptions.NotFound as e:
        app.logger.info(f"Subreddit {subreddit} not found")
        raise SubredditNotFoundError(f"Subreddit {subreddit} not found")
    except prawcore.exceptions.Redirect as e:
        app.logger.info(f"Subreddit {subreddit} not found")
        raise SubredditNotFoundError(f"Subreddit {subreddit} not found")
    except prawcore.exceptions.Forbidden as e:
        app.logger.info(f"Subreddit {subreddit} is private")
        raise PrivateSubredditError(f"Subreddit {subreddit} is private")
    except Exception as e:
        app.logger.error(f"Failed to fetch Reddit posts from {subreddit}: {e}")
        raise RedditAPIError(f"Error fetching Reddit posts from {subreddit}")
