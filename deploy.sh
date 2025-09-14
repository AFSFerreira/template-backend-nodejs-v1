#!/bin/bash
set -e

FLAG_FILE="./tmp/do-not-delete.db-init"

source ~/.bashrc

git pull origin dev
npm ci
npm run build

if [ ! -f "$FLAG_FILE" ]; then
  mkdir -p ./tmp
  touch "$FLAG_FILE"
  npm run db:reset:secure
else
  npm run db:deploy
fi

env ASDF_NODEJS_VERSION=$NODE_VERSION_PM2 pm2 reload ecosystem.config.js
