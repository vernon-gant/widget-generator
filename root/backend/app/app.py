import logging

from flask import Flask
from flask_cors import CORS

from .routes.reddit_route import reddit_route


def configure_logger(flask_app: Flask) -> None:
    flask_app.config['DEBUG'] = True
    flask_app.config['LOG_LEVEL'] = logging.DEBUG
    flask_app.config['LOG_FORMAT'] = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    flask_app.config['LOG_DATE_FORMAT'] = '%Y-%m-%d %H:%M:%S'
    flask_app.logger.setLevel(flask_app.config['LOG_LEVEL'])


def create_app() -> Flask:
    flask_app = Flask(__name__)
    configure_logger(flask_app)

    CORS(flask_app, origins='*')

    flask_app.register_blueprint(reddit_route)

    return flask_app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
