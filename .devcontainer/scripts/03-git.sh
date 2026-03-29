#!/bin/bash
set -e

echo "[+] Configurando Governança e Assinatura Git..."

chmod 600 /root/.ssh/signing_key.pub || true

git config --global pull.rebase true
git config --global gpg.format ssh
git config --global user.signingkey /root/.ssh/signing_key.pub
git config --global commit.gpgsign true

git config --global user.email "${MY_GIT_EMAIL:-dev@example.com}"
git config --global user.name "${MY_GIT_USER:-DevContainer User}"
