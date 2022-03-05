#!/bin/bash

if [ -z "$1" ]
  then
    echo "❗ No argument supplied"
fi


while getopts ":e:" opt; do
  case $opt in
    e)
      if [ $OPTARG = "dev" ]; then
      echo " 🔰 Environment: $OPTARG 🔰" >&2
      docker-compose stop ;
      docker-compose down --remove-orphans ;
      docker-compose build express-dev ;
      docker-compose up express-dev
      
      elif [ $OPTARG = "prod" ]; then
      echo "📛 Environment: $OPTARG 📛" >&2
      docker-compose stop ;
      docker-compose down --remove-orphans ;
      docker-compose build express-prod ;
      docker-compose up express-prod

      else
        echo "Invalid option: -$OPTARG" >&2
      fi
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done