build:
	docker-compose build

up:
	docker-compose up

down:
	docker-compose down

shell:
	docker exec -it backend python manage.py shell