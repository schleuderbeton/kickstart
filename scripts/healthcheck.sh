#!/bin/sh

#check if app url is not responding with http code 200
http_code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/favicon.ico);
if [ "$http_code" != 200 ]
then
  echo "App is responding with code: $http_code";
  exit 1;
fi

exit 0;
