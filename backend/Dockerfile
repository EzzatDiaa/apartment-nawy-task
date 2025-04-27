FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli

# Install dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

COPY --from=development /usr/src/app/src/database ./src/database

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
