FROM node:22.17.1-alpine AS dependencies

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

FROM dependencies as BUILD

COPY . .

RUN npm run build

FROM node:22.17.1-alpine AS release

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/build ./build

RUN npm ci --only=production --ignore-scripts

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
