#!/bin/bash

# https://stackoverflow.com/a/18443300/2840324
realpath() {
  local OURPWD=$PWD
  cd "$(dirname "$1")"
  local LINK=$(readlink "$(basename "$1")")
  while [ "$LINK" ]; do
    cd "$(dirname "$LINK")"
    local LINK=$(readlink "$(basename "$1")")
  done
  local REALPATH="$PWD/$(basename "$1")"
  cd "$OURPWD"
  echo "$REALPATH"
}

# Linux requires no "" after -i while macos does
universal_sed() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i "" "$@"
  else
    sed -i "$@"
  fi
}

CURRENT_DIR=$PWD
PROJECT_DIR="$(dirname "$(dirname "$(realpath $0)")")"
GRANT_PROG_ID_PLACEHOLDER=1212121212121212121212121212121212121212121

# change to the top level dir
cd "$PROJECT_DIR"

# replace solana program keys with current env
universal_sed -r s/$GRANT_PROG_ID_PLACEHOLDER/$GRANT_PROGRAM_ID/g ./programs/ahoy-grants/src/lib.rs ./Anchor.toml

# change to the directory the command was run in
cd $CURRENT_DIR

# run the command here
("$@")
RET=$?

# change back to to the top level
cd $PROJECT_DIR

# replace current env keys with template program key
universal_sed -r s/$GRANT_PROGRAM_ID/$GRANT_PROG_ID_PLACEHOLDER/g ./programs/ahoy-grants/src/lib.rs ./Anchor.toml

cd $CURRENT_DIR

exit $RET
