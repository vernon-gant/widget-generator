from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from werkzeug.exceptions import BadRequest

from ..parsers.reddit_parser import RedditAPIError, SubredditNotFoundError, get_reddit_posts, PrivateSubredditError

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes (If line 9 doesn't work, you can try using line 10 instead)
# CORS(app, origins='http://localhost:3000')  # This will enable CORS for a specific route

reddit_route = Blueprint('reddit_route', __name__)


@cross_origin()  # This will enable CORS for a specific route
@reddit_route.route("/reddit")
def reddit():
    if request.method == 'OPTIONS':
        # This is a preflight request. Respond accordingly.
        return {}

    limit = request.args.get("limit", type=int)
    subreddit = request.args.get("subreddit")

    # check if both limit and subreddit are provided and not empty
    if not limit or not subreddit:
        raise BadRequest("Both 'limit' and 'subreddit' parameters must be provided and not be empty in the request query")

    try:
        return jsonify({"posts": get_reddit_posts(subreddit, limit)})
    except RedditAPIError as e:
        return jsonify({"error": str(e)}), 500
    except SubredditNotFoundError as e:
        return jsonify({"error": str(e)}), 404
    except PrivateSubredditError as e:
        return jsonify({"error": str(e)}), 403
