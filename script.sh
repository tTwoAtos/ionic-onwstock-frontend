#!/bin/bash

echo "Building Ionic app"
npx ionic build

echo "Sync with Android Studio"
npx cap sync android