#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$PATH"

ensure_mise() {
    if command -v mise >/dev/null 2>&1; then
        return 0
    fi

    for mise_candidate in "$HOME/.local/bin/mise" "/usr/local/bin/mise" "/usr/bin/mise"; do
        if [ -x "$mise_candidate" ]; then
            export PATH="$(dirname "$mise_candidate"):$PATH"
            return 0
        fi
    done

    echo "[!] Mise não encontrado no PATH. Instalando fallback local..."
    curl -fsSL https://mise.run | sh
    export PATH="$HOME/.local/bin:$PATH"

    if ! command -v mise >/dev/null 2>&1; then
        echo "[x] Falha ao localizar o Mise após instalação de fallback."
        return 1
    fi

    return 0
}

echo "[+] Configurando GPG silencioso para o Mise..."
mkdir -p ~/.gnupg
chmod 700 ~/.gnupg

ensure_mise

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
