# Step 1: Build the Next.js app
FROM node:18 AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

COPY package*.json ./
RUN pnpm install

COPY . .

RUN pnpm run build && pnpm run export && test -d /app/out && echo "Export successful"

# Step 2: Serve with NGINX
FROM nginx:latest

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy exported Next.js static files
COPY --from=builder /app/out /usr/share/nginx/html

# Optional: custom nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
