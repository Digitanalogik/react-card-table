# Stage 1: Build the React application
FROM node:20 AS build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Serve the static assets with Nginx
FROM nginxinc/nginx-unprivileged:stable-alpine

# Add the ARG directive to accept the API_URL build-time argument
ARG API_URL

# Set the API_URL environment variable in the final image
ENV API_URL=$API_URL

# Copy the build output from the previous stage to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration template file
COPY nginx/nginx.conf.template /etc/nginx/nginx.conf.template

# Substitute environment variables in the Nginx configuration template
CMD /bin/sh -c "envsubst '\$API_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf"

# Expose the default Nginx port
EXPOSE 8080

# Start Nginx process
CMD ["nginx", "-g", "daemon off;"]