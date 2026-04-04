#!/bin/bash
set -e

echo "[+] Lapidando o ecossistema Zsh (.zshrc)..."

if ! grep -q "DEV CONTAINER ZSH CONFIG" ~/.zshrc 2>/dev/null; then
cat << 'EOF' >> ~/.zshrc

# ==============================================================================
# DEV CONTAINER ZSH CONFIG
# ZSH CONFIGURATION LOADED BY DEV CONTAINER (Do not edit manually here)
# ==============================================================================

# --- Ferramentas de Produtividade (Mise) ---
alias cls="clear"

alias ls="eza --icons=always --group-directories-first -a"
alias ll="eza -lahg --icons=always --git --group-directories-first"
alias tree="eza --tree --icons=always"
alias cat="bat --style=plain -P"
alias catn="bat --style=numbers,changes"
alias ld="lazydocker"
alias lg="lazygit"

# --- ZLE Keybindings (Movimentação Avançada de Cursor) ---
bindkey "\e[1;5C" forward-word
bindkey "\e[1;5D" backward-word
bindkey "\e[H"    beginning-of-line
bindkey "\e[F"    end-of-line
bindkey "\e[3~"   delete-char
bindkey "\eOH"    beginning-of-line
bindkey "\eOF"    end-of-line

# --- Inicialização Core (Histórico e SSH) ---
if command -v atuin >/dev/null 2>&1; then
	eval "$(atuin init zsh)"
fi

# Carrega a chave privada para evitar prompt de senha no git push (usa a variável injetada pelo env do container)
if [ -n "${MY_SSH_KEY_NAME:-}" ] && [ -f "$HOME/.ssh/$MY_SSH_KEY_NAME" ]; then
	keychain -q --nogui "$HOME/.ssh/$MY_SSH_KEY_NAME"
	[ -f "$HOME/.keychain/$HOST-sh" ] && source "$HOME/.keychain/$HOST-sh"
fi

# --- Lazy Loading de Ferramentas Modernas ---
# Verifica existência antes de injetar, prevenindo erros caso a ferramenta não tenha instalado
if command -v mise >/dev/null 2>&1; then eval "$(mise activate zsh)"; fi
if command -v zoxide >/dev/null 2>&1; then eval "$(zoxide init zsh)"; fi
if command -v direnv >/dev/null 2>&1; then eval "$(direnv hook zsh)"; fi
if command -v starship >/dev/null 2>&1; then eval "$(starship init zsh)"; fi

# --- Zinit: Inicialização e Plugins Assíncronos (Performance) ---
if [ -f "$HOME/.local/share/zinit/zinit.git/zinit.zsh" ]; then
	source "$HOME/.local/share/zinit/zinit.git/zinit.zsh"
	autoload -Uz _zinit
	(( ${+_comps} )) && _comps[zinit]=_zinit

	# Autocompletion base do Zsh
	autoload -Uz compinit
	compinit

	# Plugins do Oh My Zsh sem precisar do framework inteiro
	zinit ice as"completion"
	zinit light zsh-users/zsh-completions

	# Carregamento 'Lucid' (Assíncrono) para não travar a abertura do terminal
	zinit ice wait"0a" lucid atload"_zsh_autosuggest_start"
	zinit light zsh-users/zsh-autosuggestions

	zinit ice wait"0b" lucid
	zinit light zdharma-continuum/fast-syntax-highlighting
fi

# ==============================================================================
EOF
fi

echo "[+] Habilitando o direnv..."
if command -v mise >/dev/null 2>&1 && command -v direnv >/dev/null 2>&1; then
	mise exec -- direnv allow
else
	echo "    Aviso: mise ou direnv indisponível. Pulando 'direnv allow'."
fi

echo "[+] Configurando .bashrc com ativação do Mise (fallback para shells bash)..."
if ! grep -q "MISE BASH ACTIVATION" ~/.bashrc 2>/dev/null; then
cat << 'BASHEOF' >> ~/.bashrc

# ==============================================================================
# MISE BASH ACTIVATION (fallback para terminais que abrem bash em vez de zsh)
# ==============================================================================
if command -v mise >/dev/null 2>&1; then eval "$(mise activate bash)"; fi
# ==============================================================================
BASHEOF
fi

