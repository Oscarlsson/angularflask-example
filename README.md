
## Docker
docker build -t flask-sample-one:latest .
docker run -d -p 8000:8000 flask-sample-one

### Useful docker commands
docker ps -a

docker kill <id>

docker exec -it <id> bash
$ cat /app/example/uwsgi.log

## Run locally with flask only
python run.py

Available on port 8000 so:  https://127.0.0.1:8000/
