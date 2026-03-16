#!/bin/bash
set -e # Para o script se algo falhar

echo "🚀 Iniciando Setup do Ambiente..."
mise install
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
yes | pnpm approve-builds

echo "🔐 Configurando Git Identity..."
git config --global user.signingkey /root/.ssh/signing_key.pub
git config --global gpg.format ssh
git config --global commit.gpgsign true
git config --global user.email "<EMAIL>"
git config --global user.name "<USERNAME>"
