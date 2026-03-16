FROM mcr.microsoft.com/devcontainers/base:debian

RUN apt-get update && apt-get install -y curl gpg

RUN curl https://mise.jdx.dev/install.sh | sh

ENV MISE_DATA_DIR="/root/.local/share/mise"
ENV MISE_CONFIG_DIR="/root/.config/mise"
ENV PATH="/root/.local/bin:/root/.local/share/mise/shims:$PATH"

WORKDIR /workspace

COPY .mise.toml ./

RUN /root/.local/bin/mise install --yes
