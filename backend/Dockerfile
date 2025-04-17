FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Install dependencies
RUN npm install

COPY . .

# Build the application
RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Install NestJS CLI globally in the production image too
RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

# Use development mode for this assignment to auto-reload with changes
CMD ["npm", "run", "start:dev"]
