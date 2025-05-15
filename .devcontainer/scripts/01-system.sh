#!/bin/bash
set -e

echo "[+] Atualizando repositórios e instalando utilitários do sistema..."
sudo DEBIAN_FRONTEND=noninteractive apt-get update -y
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y keychain curl git

echo "[+] Instalando Zinit (Gerenciador de Plugins do Zsh)..."
if [ ! -d "$HOME/.local/share/zinit/zinit.git" ]; then
    mkdir -p "$HOME/.local/share/zinit"
    git clone https://github.com/zdharma-continuum/zinit.git "$HOME/.local/share/zinit/zinit.git"
fi
