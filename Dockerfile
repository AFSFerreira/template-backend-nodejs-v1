FROM node:22.17.1-alpine AS build

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

FROM build AS release

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json .
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/prisma.config.ts .


RUN npm ci --only=production --ignore-scripts

EXPOSE 3000

# CMD ["sh", "-c", "$COMMAND"]
