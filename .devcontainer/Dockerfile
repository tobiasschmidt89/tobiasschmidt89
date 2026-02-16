FROM oven/bun:alpine

USER root

RUN apk add --no-cache \
    git \
    curl \
    openssh-client \
    github-cli \
    xsel \
    bash

RUN bun install -g @google/gemini-cli

ENV SHELL /bin/bash
