# Frontend Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY packages/shared/package*.json ./packages/shared/
COPY packages/frontend/package*.json ./packages/frontend/

RUN npm install

COPY packages/shared ./packages/shared
COPY packages/frontend ./packages/frontend

RUN npm run build:shared
RUN npm run build:frontend

FROM nginx:alpine AS runner

COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html

# Custom nginx conf for SPA routing
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://backend:4000/api/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
