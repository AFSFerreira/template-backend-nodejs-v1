#!/bin/bash
set -e

echo "🚀 Iniciando Setup Modular do Dev Container..."

echo "🔧 Reivindicando permissões de diretórios criados pelo Docker..."
# O Docker cria o volume do pnpm_cache como root. Este comando devolve a propriedade da pasta ao usuário vscode.
sudo chown -R vscode:vscode "$HOME/.local" 2>/dev/null || true

echo "==> Executando Módulo 1: Sistema e Utilitários"
source .devcontainer/scripts/01-system.sh

echo "==> Executando Módulo 2: Mise, Node e PNPM"
source .devcontainer/scripts/02-mise.sh

echo "==> Executando Módulo 3: Git Identity"
source .devcontainer/scripts/03-git.sh

echo "==> Executando Módulo 4: Zsh e Produtividade"
source .devcontainer/scripts/04-zsh.sh

echo "✅ Ambiente construído com sucesso!"
