FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Create a nest-cli.json file if it doesn't exist
RUN if [ ! -f nest-cli.json ]; then echo '{"collection": "@nestjs/schematics","sourceRoot": "src","compilerOptions": {"deleteOutDir": true,"plugins": []}}' > nest-cli.json; fi

# Make sure the tsconfig.json exists (typical NestJS configuration)
RUN if [ ! -f tsconfig.json ]; then echo '{"compilerOptions": {"module": "commonjs","declaration": true,"removeComments": true,"emitDecoratorMetadata": true,"experimentalDecorators": true,"allowSyntheticDefaultImports": true,"target": "es2017","sourceMap": true,"outDir": "./dist","baseUrl": "./","incremental": true},"include": ["src/**/*"],"exclude": ["node_modules", "dist"]}' > tsconfig.json; fi

# Run the build
RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

# Use development mode for this assignment to auto-reload with changes
CMD ["npm", "run", "start:dev"]
