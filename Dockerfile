# Stage 1: Build the React application
FROM node:20 AS build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Serve the static assets with Nginx
FROM nginxinc/nginx-unprivileged:stable-alpine

# Copy the build output from the previous stage to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 8080

# Start Nginx process
CMD ["nginx", "-g", "daemon off;"]