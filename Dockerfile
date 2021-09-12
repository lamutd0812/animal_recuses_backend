FROM node:16-alpine3.11

RUN mkdir -p /animal-recuces-backend/rest-api

WORKDIR /animal-recuces-backend/rest-api

COPY package.json package.json

RUN npm install --legacy-peer-deps && npm cache clean --force

COPY . .

# Development
CMD ["npm", "run", "start:dev"]

# Production
# EXPOSE 8080
# CMD [ "node", "dist/main" ]

# Production using pm2
# RUN npm install -g pm2
# CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]