FROM node:18-alpine3.15 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:18-alpine3.15 AS runner
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --prod
RUN npm install prisma -g 
COPY --from=builder /app/dist ./dist
