#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_DIR="$PROJECT_ROOT/.claude-environments"

if ! command -v claude >/dev/null 2>&1; then
  echo "Error: claude command not found."
  echo "Please install Claude Code first:"
  echo "npm install -g @anthropic-ai/claude-code"
  exit 1
fi

if [ ! -d "$ENV_DIR" ]; then
  echo "Error: .ai-environments directory not found."
  echo "Expected path:"
  echo "$ENV_DIR"
  exit 1
fi

ENV_FILES=()

while IFS= read -r file; do
  ENV_FILES+=("$file")
done < <(find "$ENV_DIR" -maxdepth 1 -type f -name "*.env" ! -name "example.env" | sort)

if [ "${#ENV_FILES[@]}" -eq 0 ]; then
  echo "Error: no .env files found in .ai-environments."
  echo "Example:"
  echo "$ENV_DIR/deepseek.env"
  exit 1
fi

get_env_value() {
  local file="$1"
  local key="$2"

  local line
  line="$(grep -E "^[[:space:]]*${key}[[:space:]]*=" "$file" | head -n 1 || true)"

  if [ -z "$line" ]; then
    echo ""
    return
  fi

  local value
  value="$(echo "$line" | sed -E "s/^[[:space:]]*${key}[[:space:]]*=[[:space:]]*//")"

  value="${value%\"}"
  value="${value#\"}"
  value="${value%\'}"
  value="${value#\'}"

  echo "$value"
}

echo ""
echo "Available AI environments:"
echo ""

for i in "${!ENV_FILES[@]}"; do
  file="${ENV_FILES[$i]}"
  filename="$(basename "$file")"
  name="$(get_env_value "$file" "AI_ENV_NAME")"
  description="$(get_env_value "$file" "AI_ENV_DESCRIPTION")"

  if [ -z "$name" ]; then
    name="${filename%.env}"
  fi

  printf "  [%d] %s" "$((i + 1))" "$name"

  if [ -n "$description" ]; then
    printf " - %s" "$description"
  fi

  printf "\n"
done

echo ""
read -rp "Choose an environment [1-${#ENV_FILES[@]}]: " CHOICE

if ! [[ "$CHOICE" =~ ^[0-9]+$ ]]; then
  echo "Error: invalid choice."
  exit 1
fi

if [ "$CHOICE" -lt 1 ] || [ "$CHOICE" -gt "${#ENV_FILES[@]}" ]; then
  echo "Error: choice out of range."
  exit 1
fi

SELECTED_FILE="${ENV_FILES[$((CHOICE - 1))]}"
SELECTED_NAME="$(get_env_value "$SELECTED_FILE" "AI_ENV_NAME")"

if [ -z "$SELECTED_NAME" ]; then
  SELECTED_NAME="$(basename "$SELECTED_FILE" .env)"
fi

echo ""
echo "Using AI environment: $SELECTED_NAME"
echo "Config file: $SELECTED_FILE"
echo ""

unset ANTHROPIC_BASE_URL
unset ANTHROPIC_AUTH_TOKEN
unset ANTHROPIC_API_KEY
unset ANTHROPIC_MODEL
unset ANTHROPIC_DEFAULT_OPUS_MODEL
unset ANTHROPIC_DEFAULT_SONNET_MODEL
unset ANTHROPIC_DEFAULT_HAIKU_MODEL
unset CLAUDE_CODE_SUBAGENT_MODEL
unset CLAUDE_CODE_EFFORT_LEVEL

set -a
# shellcheck source=/dev/null
source "$SELECTED_FILE"
set +a

unset AI_ENV_NAME
unset AI_ENV_DESCRIPTION

cd "$PROJECT_ROOT"

claude "$@"