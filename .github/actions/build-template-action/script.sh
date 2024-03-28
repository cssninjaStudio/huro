#!/bin/bash

DIRECTORY=`dirname $0`
INPUT_PROJECT=$1
INPUT_TAG=$2

if [ -z $INPUT_PROJECT ] 
then
  echo "<project> missing"
  echo "Usage: ${0} <project> <tag>"
  exit 1
fi

if [ -z $INPUT_TAG ] 
then
  echo "<tag> missing"
  echo "Usage: ${0} <project> <tag>"
  exit 1
fi

ARCHIVE=release-${INPUT_PROJECT}-${INPUT_TAG}.zip

echo "::group::building ${ARCHIVE}"
echo "::debug::${ARCHIVE}"

# remove "development" in constants.js
sed -i 's/env = 'development'/env = ''/g' src/assets/js/functions.js

# # remove photos
# rm -rf ./src/assets/img/avatars
# rm -rf ./src/assets/img/demo

# top level zip release-${INPUT_PROJECT}-${INPUT_TAG}.zip 
zip -r $ARCHIVE . \
  -x "src/assets/img/avatars/photos/*" \
  -x "src/assets/img/photo/demo/*" \
  -x "*.zip" \
  -x "node_modules/*" \
  -x "dist/*" \
  -x ".git/*" \
  -x ".github/*" \
  -x "docker-compose.yml"

# restore constants.js
git checkout src/assets/js/functions.js

echo "$PWD"
echo "$DIRECTORY"
echo "$GITHUB_WORKSPACE"

ls -lh $ARCHIVE

echo "::endgroup::"

echo "### ${INPUT_PROJECT^} ${INPUT_TAG} :rocket:" >> $GITHUB_STEP_SUMMARY

echo "filepath=${ARCHIVE}" >> "$GITHUB_OUTPUT"