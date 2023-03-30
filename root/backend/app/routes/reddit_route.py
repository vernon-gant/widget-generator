from root.backend.app.parsers.reddit_parser import get_reddit_posts
from flask import Blueprint, jsonify, request
from root.backend.app.parsers.reddit_parser import RedditAPIError, RedditNotFoundError

reddit_route = Blueprint('reddit_route', __name__)


@reddit_route.route("/reddit")
def reddit():
    limit = int(request.args.get("limit", 10))
    subreddit = request.args.get("subreddit", "all")

    try:
        return jsonify({"data": get_reddit_posts(subreddit, limit)})
    except RedditAPIError as e:
        return jsonify({"error": str(e)}), 500
    except RedditNotFoundError as e:
        return jsonify({"error": str(e)}), 404
