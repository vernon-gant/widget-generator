# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory in the container to /app
WORKDIR /api

# Add the current directory contents into the container at /app
ADD . /api

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV FLASK_APP=app.app
ENV FLASK_RUN_HOST=0.0.0.0

# Run the command to start gunicorn
CMD [ "gunicorn", "-b", ":80", "--access-logfile", "-", "--access-logformat", "%(h)s %(l)s %(u)s %(t)s \"%(r)s\" %(s)s %(b)s \"%(f)s\" \"%(a)s\" %(L)s", "app.app:create_app()" ]
