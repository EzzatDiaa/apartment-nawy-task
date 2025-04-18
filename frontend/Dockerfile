FROM node:18-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Remove app directory to avoid conflicts with pages directory
RUN rm -rf app/

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Create public directory
RUN mkdir -p /app/public

# Copy required files without the public directory
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
EXPOSE 3001

CMD ["npm", "start"]
