#!/bin/bash

readme_path="../../README.md"

if [ ! -f $readme_path ]; then
echo "README not found!"
fi

cp $readme_path ./
