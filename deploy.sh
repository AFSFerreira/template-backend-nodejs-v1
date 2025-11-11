#!/bin/bash
set -e

source ~/.bashrc

git pull origin dev --rebase

npm ci

npm run build

npm run db:deploy

env ASDF_NODEJS_VERSION=$NODE_VERSION_PM2 pm2 reload ecosystem.config.cjs
