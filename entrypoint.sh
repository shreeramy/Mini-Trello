#!/bin/sh

# Script that runs when the backend starts up

python3 manage.py makemigrations --noinput
python3 manage.py migrate
