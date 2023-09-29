#!/bin/bash

set +u

# DNS resolvers can be defined via environment variable
if [ -z "${RESOLVERS}" ]; then
  echo "NGiNX is using resolvers from /etc/resolv.conf. Override with RESOLVERS environment variable."
  RESOLVERS=$(cat /etc/resolv.conf | grep "nameserver" | awk '{print $2}' | tr '\n' ' ')
  export RESOLVERS
else
  echo "NGiNX is using resolvers defined with RESOLVERS environment variable."
fi
echo "(dns) RESOLVERS: ${RESOLVERS}"

# Exit with error, if there are undeclared variables
set -u

echo "Using configured address $API_URL"

FILE=/etc/nginx/conf.d/default.conf
TMP_FILE=default.conf.tmp
#Substitute all environment variables defined in the file given as argument
envsubst '$API_URL' < $FILE > $TMP_FILE && mv $TMP_FILE $FILE
envsubst '${RESOLVERS}' < $FILE > $TMP_FILE && mv $TMP_FILE $FILE
exec "$@"
