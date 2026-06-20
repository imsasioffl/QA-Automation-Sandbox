# Step 1: Build the application
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the application using a light weight web server
FROM alpine:latest
RUN apk add --no-cache caddy
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["caddy", "file-server", "--browse", "--listen", ":8080", "--root", "./dist"]
