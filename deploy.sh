#!/usr/bin/env bash
set -e

# ANSI color codes
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RESET="\033[0m"

function error {
  echo -e "${RED}✖ $1${RESET}"
  exit 1
}

function success {
  echo -e "${GREEN}✔ $1${RESET}"
}

# require a commit message
if [ $# -eq 0 ]; then
  error "Usage: ./deploy.sh \"Your commit message here\""
fi

MSG="$1"

# ensure we are on master
CURRENT=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT" != "master" ]; then
  error "You must run this from the master branch (current: $CURRENT)"
fi

echo -e "${YELLOW}Staging all changes…${RESET}"
git add .

echo -e "${YELLOW}Committing with message:${RESET} \"$MSG\""
git commit -m "$MSG" || error "Nothing to commit."

echo -e "${YELLOW}Pushing master → origin/master…${RESET}"
git push origin master || error "Failed to push master to origin/master."

# create or update gh-pages
if git ls-remote --exit-code --heads origin gh-pages >/dev/null; then
  echo -e "${YELLOW}Updating origin/gh-pages from master…${RESET}"
  git push origin master:gh-pages --force || error "Failed to update gh-pages."
else
  echo -e "${YELLOW}Creating origin/gh-pages from master…${RESET}"
  git push origin master:gh-pages || error "Failed to create gh-pages."
fi

success "Deployment complete!"