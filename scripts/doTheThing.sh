#!/bin/bash

npm run build:cache
if [ $? != 0 ]; then
   echo "Command failed with exit code $?" 1>&2
   exit 1
fi

git add public/
git commit -m "Update cache"
git push origin auto-cache
npm run deploy
