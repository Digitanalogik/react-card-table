#!/bin/bash
docker run -p 80:8080 --env "API_URL=${API_URL}" --name card-table-app react-card-table
