# Build stage
FROM node:lts-alpine AS build

WORKDIR /usr/src/api

# Copy package.json and package-lock.json separately to leverage Docker layer caching
COPY package*.json ./
RUN npm ci

# Copy the rest of your application code
COPY . .

RUN npx prisma generate
# Build your NestJS application
RUN npm run build

# Production stage
FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/api

# Copy the production-ready files from the build stage
COPY --from=build /usr/src/api/dist ./dist

# Copy the package.json and package-lock.json to install production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

COPY prisma ./prisma/

RUN npx prisma generate

# Expose port 3000 for your NestJS application
EXPOSE 3000

ENV TZ=America/Sao_Paulo

CMD ["node", "dist/src/main.js"]
