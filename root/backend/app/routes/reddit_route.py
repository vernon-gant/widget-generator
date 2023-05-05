from ..parsers.reddit_parser import get_reddit_posts
from flask import Blueprint, jsonify, request
from ..parsers.reddit_parser import RedditAPIError, RedditNotFoundError

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes (If line 9 doesn't work, you can try using line 10 instead)
# CORS(app, origins='http://localhost:3000')  # This will enable CORS for a specific route

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
