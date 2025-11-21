#!/bin/bash
set -e

source ~/.bashrc

git pull origin dev --rebase

export SENTRY_RELEASE=$(git rev-parse --short HEAD)

npm ci

npm run build

npm run sentry:upload

npm run db:deploy

env ASDF_NODEJS_VERSION=$NODE_VERSION_PM2 SENTRY_RELEASE=$SENTRY_RELEASE pm2 reload ecosystem.config.cjs --update-env
