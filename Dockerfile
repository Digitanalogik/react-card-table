# Stage 1: Build the React application
FROM node:20 AS build

# First phase: Do the production build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Serve the static assets with Nginx
FROM nginx:stable-alpine

# Always update the system
RUN apk update && apk -U upgrade

# Add the ARG directive to accept the API_URL build-time argument
ARG API_URL

# Set the API_URL environment variable in the final image
ENV API_URL=$API_URL

# Copy the build output from the previous stage to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration template file
COPY ./nginx/nginx.conf.template /etc/nginx/conf.d/default.conf

# Copy the installation preparation script and make it executable
COPY ./nginx/docker-entrypoint.sh /init/docker-entrypoint.sh
RUN chmod u+x /init/docker-entrypoint.sh

# Substitute environment variables in the Nginx configuration template
ENTRYPOINT ["sh", "./init/docker-entrypoint.sh"]

# Expose the default Nginx port
EXPOSE 80

# Start Nginx process
CMD ["nginx", "-g", "daemon off;"]
