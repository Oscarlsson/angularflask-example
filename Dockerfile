FROM ubuntu:latest
MAINTAINER Oscar Carlsson "ocarlsson3@gmail.com"

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

RUN mkdir /app
RUN chmod a+rwx /app
# Copy the uWSGI configuration.
COPY uwsgi.ini /app
# Copy the app's files.
COPY example /app/example
COPY requirements.txt /app

RUN pip install -r /app/requirements.txt
CMD ["uwsgi", "--ini", "/app/uwsgi.ini", "--die-on-term"]
EXPOSE 8000
