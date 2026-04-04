#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Iniciando Setup Modular do Dev Container..."

echo "🔧 Reivindicando permissões de diretórios criados pelo Docker..."
sudo chown -R vscode:vscode "$HOME/.local" 2>/dev/null || true

echo "==> Executando Módulo 1: Sistema e Utilitários"
source "$SCRIPT_DIR/scripts/01-system.sh"

echo "==> Executando Módulo 2: Mise, Node e PNPM"
source "$SCRIPT_DIR/scripts/02-mise.sh"

echo "==> Executando Módulo 3: Git Identity"
source "$SCRIPT_DIR/scripts/03-git.sh"

echo "==> Executando Módulo 4: Zsh e Produtividade"
source "$SCRIPT_DIR/scripts/04-zsh.sh"

echo "✅ Ambiente construído com sucesso!"
