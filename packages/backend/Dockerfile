# Backend Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root and package configuration
COPY package*.json ./
COPY packages/shared/package*.json ./packages/shared/
COPY packages/backend/package*.json ./packages/backend/

RUN npm install

COPY packages/shared ./packages/shared
COPY packages/backend ./packages/backend

# Build shared and backend
RUN npm run build:shared
RUN cd packages/backend && npx prisma generate --schema=prisma/schema.postgresql.prisma
RUN npm run build:backend

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages/shared/package*.json ./packages/shared/
COPY --from=builder /app/packages/backend/package*.json ./packages/backend/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/backend/dist ./packages/backend/dist
COPY --from=builder /app/packages/backend/prisma ./packages/backend/prisma

EXPOSE 4000

CMD ["node", "packages/backend/dist/index.js"]
