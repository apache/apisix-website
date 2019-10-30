#!/bin/sh

if [[ $(git status -s) ]]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf public
mkdir public
rm -rf .git/worktrees/public/

echo "Checking out asf-site branch into public"
git worktree add -B asf-site public origin/asf-site

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
hugo

echo "Updating asf-site branch"
cd public && cp ../README.md ./ && cp ../.asf.yaml ./ && git add --all && git commit -m "Publishing to asf-site (publish.sh)"

echo "Push to origin"
git push origin asf-site -f