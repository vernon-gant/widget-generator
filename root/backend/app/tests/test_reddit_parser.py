from unittest import TestCase
from unittest.mock import MagicMock

from ..parsers.reddit_parser import (
    is_url_submission,
    is_video_submission,
    has_embed_videos,
    get_video_from_submission,
    is_image_submission,
    has_embed_images,
    get_image_from_submission,
)


class TestIsURLSubmission(TestCase):
    def test_is_url_submission_true(self):
        mock_submission = MagicMock()
        mock_submission.selftext = ""
        mock_submission.url = "http://example.com"
        mock_submission.is_video = False
        mock_submission.is_image = False

        result = is_url_submission(mock_submission)

        self.assertTrue(result)

    def test_is_url_submission_false_selftext(self):
        mock_submission = MagicMock()
        mock_submission.selftext = "This is a selftext submission."
        mock_submission.url = "http://example.com"
        mock_submission.is_video = False
        mock_submission.is_image = False

        result = is_url_submission(mock_submission)

        self.assertFalse(result)

    def test_is_url_submission_false_image(self):
        mock_submission = MagicMock()
        mock_submission.selftext = ""
        mock_submission.url = "http://i.redd.it/image.png"
        mock_submission.is_video = False
        mock_submission.is_image = True

        result = is_url_submission(mock_submission)

        self.assertFalse(result)

    def test_is_url_submission_false_video(self):
        mock_submission = MagicMock()
        mock_submission.selftext = ""
        mock_submission.url = "http://v.redd.it/video.mp4"
        mock_submission.is_video = True
        mock_submission.is_image = False

        result = is_url_submission(mock_submission)

        self.assertFalse(result)

    def test_is_url_submission_false_no_http(self):
        mock_submission = MagicMock()
        mock_submission.selftext = ""
        mock_submission.url = "ftp://example.com"
        mock_submission.is_video = False
        mock_submission.is_image = False

        result = is_url_submission(mock_submission)

        self.assertFalse(result)


class TestIsVideoSubmission(TestCase):
    def test_is_video_submission_true(self):
        mock_submission = MagicMock()
        mock_submission.url = "http://v.redd.it/video.mp4"

        result = is_video_submission(mock_submission)

        self.assertTrue(result)

    def test_is_video_submission_false(self):
        mock_submission = MagicMock()
        mock_submission.url = "http://example.com"

        result = is_video_submission(mock_submission)

        self.assertFalse(result)


class TestHasEmbedVideos(TestCase):
    def test_has_embed_videos_true(self):
        mock_submission = MagicMock()
        mock_submission.media_metadata = {
            "1": {
                "e": "Video",
                "s": {
                    "u": "http://example.com/video.mp4"
                }
            },
            "2": {
                "e": "RedditVideo",
                "urlDash": "http://example.com/video.mp4"
            }
        }

        result = has_embed_videos(mock_submission)

        self.assertTrue(result)

    def test_has_embed_videos_false(self):
        mock_submission = MagicMock()
        mock_submission.media_metadata = {
            "1": {
                "e": "Image",
                "s": {
                    "u": "http://example.com/image.png"
                }
            }
        }

        result = has_embed_videos(mock_submission)

        self.assertFalse(result)

    def test_has_embed_videos_empty(self):
        mock_submission = MagicMock()
        mock_submission.media_metadata = None

        result = has_embed_videos(mock_submission)

        self.assertFalse(result)


class TestGetVideoFromSubmission(TestCase):

    def test_get_video_from_submission_is_video_submission(self):
        mock_submission = MagicMock()
        mock_submission.url = "http://v.redd.it/video.mp4"
        mock_submission.secure_media = {
            "reddit_video": {
                "fallback_url": "http://example.com/video.mp4"
            }
        }

        result = get_video_from_submission(mock_submission)

        self.assertEqual(result, ["http://example.com/video.mp4"])

    def test_get_video_from_submission_reddit_video(self):
        mock_submission = MagicMock()
        mock_submission.url = "http://example.com"
        mock_submission.media_metadata = {
            "1": {
                "e": "RedditVideo",
                "dashUrl": "http://example.com/video.mp4"
            },
        }

        result = get_video_from_submission(mock_submission)

        self.assertEqual(result, ["http://example.com/video.mp4"])

    def test_get_video_from_submission_empty(self):
        mock_submission = MagicMock()
        mock_submission.url = "http://reddit.com/r/subreddit"
        mock_submission.media_metadata = None

        result = get_video_from_submission(mock_submission)

        self.assertEqual(result, [])


class TestIsImageSubmission(TestCase):
    def test_is_image_submission_true(self):
        mock_submission = MagicMock()
        mock_submission.url = "http://i.redd.it/image.png"

        result = is_image_submission(mock_submission)

        mock_submission2 = MagicMock()
        mock_submission2.url = "http://i.imgur.com/image.png"

        result2 = is_image_submission(mock_submission2)

        self.assertTrue(result)
        self.assertTrue(result2)

    def test_is_image_submission_false(self):
        mock_submission = MagicMock()
        mock_submission.url = "http://example.com"

        result = is_image_submission(mock_submission)

        self.assertFalse(result)


class TestHasEmbedImages(TestCase):
    def test_has_embed_images_true(self):
        mock_submission = MagicMock()
        mock_submission.media_metadata = {
            "1": {
                "e": "Image",
                "s": {
                    "u": "http://example.com/image.png"
                }
            }
        }

        result = has_embed_images(mock_submission)

        self.assertTrue(result)

    def test_has_embed_images_false(self):
        mock_submission = MagicMock()
        mock_submission.media_metadata = {
            "1": {
                "e": "Video",
                "s": {
                    "u": "http://example.com/video.mp4"
                }
            }
        }

        result = has_embed_images(mock_submission)

        self.assertFalse(result)

    def test_has_embed_images_empty(self):
        mock_submission = MagicMock()
        mock_submission.media_metadata = None

        result = has_embed_images(mock_submission)

        self.assertFalse(result)


class TestGetImageFromSubmission(TestCase):

    def test_get_image_from_submission_is_image_submission(self):
        mock_submission = MagicMock()
        mock_submission.url = "http://i.redd.it/image.png"
        mock_submission.preview = {
            "images": [
                {
                    "source": {
                        "url": "http://example.com/image.png"
                    }
                },
                {
                    "source": {
                        "url": "http://example.com/image2.png"
                    }
                }
            ]
        }

        result = get_image_from_submission(mock_submission)

        self.assertEqual(result, ["http://example.com/image.png", "http://example.com/image2.png"])

    def test_get_image_from_submission_has_embed_images(self):
        mock_submission = MagicMock()
        mock_submission.url = "http://example.com"
        mock_submission.media_metadata = {
            "1": {
                "e": "Image",
                "s": {
                    "u": "http://example.com/image.png"
                }
            },
        }

        result = get_image_from_submission(mock_submission)

        self.assertEqual(result, ["http://example.com/image.png"])

    def test_get_image_from_submission_empty(self):
        mock_submission = MagicMock()
        mock_submission.url = "http://reddit.com/r/subreddit"
        mock_submission.media_metadata = None

        result = get_image_from_submission(mock_submission)

        self.assertEqual(result, [])



