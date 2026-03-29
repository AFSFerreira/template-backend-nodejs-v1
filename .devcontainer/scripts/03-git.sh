#!/bin/bash
set -e

echo "[+] Configurando Governança e Assinatura Git..."

SIGNING_KEY_PATH="$HOME/.ssh/signing_key.pub"

chmod 600 "$SIGNING_KEY_PATH" 2>/dev/null || true

git config --global pull.rebase true
git config --global gpg.format ssh

if [ -f "$SIGNING_KEY_PATH" ]; then
	git config --global user.signingkey "$SIGNING_KEY_PATH"
	git config --global commit.gpgsign true
else
	echo "    Aviso: chave de assinatura SSH nao encontrada em $SIGNING_KEY_PATH."
	git config --global --unset user.signingkey 2>/dev/null || true
	git config --global commit.gpgsign false
fi

git config --global user.email "${MY_GIT_EMAIL:-dev@example.com}"
git config --global user.name "${MY_GIT_USER:-DevContainer User}"
