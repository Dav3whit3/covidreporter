#!/bin/bash

docker-compose stop

docker-compose down --remove-orphans

docker-compose build

docker-compose up