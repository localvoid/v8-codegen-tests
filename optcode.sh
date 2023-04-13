#/usr/bin/env sh

TEST_TYPE=optcode TEST=$2 node --allow-natives-syntax --print-opt-code $1
