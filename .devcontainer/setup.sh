#!/bin/bash
set -e # Para o script se algo falhar

echo "🚀 Iniciando Setup do Ambiente..."
mise install
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
yes | pnpm approve-builds

echo "🔐 Configurando Git Identity..."
git config pull.rebase true
git config --global gpg.format ssh
git config --global user.signingkey /root/.ssh/signing_key
git config --global commit.gpgsign true
git config --global user.email "$MY_GIT_EMAIL"
git config --global user.name "$MY_GIT_USER"
