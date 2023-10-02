#!/bin/bash
docker run -p 80:80 --env "API_URL=${API_URL}" --name card-table-app react-card-table
