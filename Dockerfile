## Development ##
FROM node:14 AS development

WORKDIR /animal-recuces/rest-api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]

## Production ##
FROM node:14 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /animal-recuces/rest-api

COPY --from=development /animal-recuces/rest-api .

EXPOSE 8080

CMD [ "node", "dist/main" ]