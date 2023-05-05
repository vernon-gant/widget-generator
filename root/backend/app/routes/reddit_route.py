from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

from ..parsers.reddit_parser import RedditAPIError, RedditNotFoundError, get_reddit_posts

reddit_route = Blueprint('reddit_route', __name__)


@cross_origin()  # This will enable CORS for a specific route
@reddit_route.route("/reddit")
def reddit():
    limit = int(request.args.get("limit", 10))
    subreddit = request.args.get("subreddit", "all")

    try:
        return jsonify({"posts": get_reddit_posts(subreddit, limit)})
    except RedditAPIError as e:
        return jsonify({"error": str(e)}), 500
    except RedditNotFoundError as e:
        return jsonify({"error": str(e)}), 404
