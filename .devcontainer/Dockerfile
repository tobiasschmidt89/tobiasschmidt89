FROM oven/bun:alpine

USER root

RUN apk add --no-cache \
    git \
    curl \
    openssh-client \
    github-cli

RUN bun install -g gemini-cli

RUN mkdir -p /docs && \
    echo "<h1>Codespace Ready</h1><p>Edit /docs to see changes.</p>" > /docs/index.html

ENV SHELL /bin/ash
