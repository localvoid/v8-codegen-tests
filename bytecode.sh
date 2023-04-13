#/usr/bin/env sh

TEST_TYPE=bytecode TEST=$2 node --allow-natives-syntax --print-bytecode --print-bytecode-filter=$2 $1
