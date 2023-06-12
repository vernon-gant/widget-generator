import unittest
import json
from unittest.mock import patch
from ..app import create_app
from ..parsers.exceptions import RedditAPIError, SubredditNotFoundError


class MockSubmission:
    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)


class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    @patch("app.routes.reddit_route.get_reddit_posts")
    def test_reddit_route_success(self, mock_get_reddit_posts):
        # Write mock response according to the return value of get_reddit_posts
        mock_submissions = [
            MockSubmission(
                title="Test title",
                content="Test content",
                author="Test author",
                images=[],
                likes=42,
                comments=12,
                url="https://www.reddit.com/r/test/comments/test",
                date="2023-04-27T12:34:56",
                id="test1",
                video=[]
            ),
        ]
        mock_get_reddit_posts.return_value = [submission.__dict__ for submission in mock_submissions]

        response = self.client.get("/reddit?subreddit=test&limit=5")
        data = json.loads(response.data)

        # Add assertions for the response status code and data structure
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, dict)
        self.assertIn("data", data)
        self.assertIsInstance(data["data"], list)
        self.assertEqual(data["data"], [submission.__dict__ for submission in mock_submissions])

    @patch("app.routes.reddit_route.get_reddit_posts")
    def test_reddit_route_error_500(self, mock_get_reddit_posts):
        mock_get_reddit_posts.side_effect = RedditAPIError("Error fetching Reddit posts")

        response = self.client.get("/reddit?subreddit=test&limit=5")

        self.assertEqual(response.status_code, 500)
        self.assertEqual(json.loads(response.data), {"error": "Error fetching Reddit posts"})

    @patch("app.routes.reddit_route.get_reddit_posts")
    def test_reddit_route_error_404(self, mock_get_reddit_posts):
        mock_get_reddit_posts.side_effect = SubredditNotFoundError("Subreddit not found")

        response = self.client.get("/reddit?subreddit=test&limit=5")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(json.loads(response.data), {"error": "Subreddit not found"})
