from flask import Flask

from root.backend.app.routes.reddit_route import reddit_route


def create_app() -> Flask:
    flask_app = Flask(__name__)
    flask_app.register_blueprint(reddit_route)
    return flask_app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)