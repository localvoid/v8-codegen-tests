# V8 CodeGen Tests

Just some tests to explore V8 Code Generation.

## Running Tests

`optcode.sh` - Prints V8 OptCode.

```sh
./optcode.sh tests/var-let.mjs _var
# ^launcher  ^test-file        ^test-name
```

`bytecode.sh` - Prints V8 ByteCode.

```sh
./bytecode.sh tests/var-let.mjs _var
# ^launcher   ^test-file        ^test-name
```
