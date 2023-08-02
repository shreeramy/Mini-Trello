# Mini-Trello

# setup docker

1. sudo apt-get update
2. sudo apt-get install docker-ce docker-ce-cli containerd.io

# project setup
1. copy your project and paste into root directory
2. create .env file into root directory
3. copy docker-compose.yml, Dockerfile, Makefile and entrypoint.sh in your project
4. run sudo make build 
5. run sudo make down up

### Dependencies

Docker 24.0.2

to setup a new admin you can run
`docker-compose exec backend python manage.py createsuperuser`

then login at
`localhost:9000/admin/`

for the graphql entrypoint you can use
`http://localhost:8000/graphql`

# entrypoint

A entrypoint file is shell script file it run python manage.py makemigrations and migrate command
