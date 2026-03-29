#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$PATH"

echo "[+] Configurando GPG silencioso para o Mise..."
mkdir -p ~/.gnupg
chmod 700 ~/.gnupg

echo "[+] Injetando manifesto de ferramentas (Mise Container)..."
mkdir -p ~/.config/mise
if [ -f ".devcontainer/mise-container.toml" ]; then
    cp .devcontainer/mise-container.toml ~/.config/mise/config.toml
else
    echo "    Aviso: .devcontainer/mise-container.toml não encontrado. Pulando ferramentas extras."
fi

echo "[+] Instalando Node, PNPM e Ferramentas (Mise)..."
MISE_NODE_VERIFY=0 mise install --yes

echo "[+] Limpando vestígios de builds anteriores (Sanitização)..."
sudo chown -R vscode:vscode /workspace/node_modules 2>/dev/null || true

echo "[+] Instalando dependências do repositório..."
mise exec -- pnpm install
yes | mise exec -- pnpm approve-builds || true
