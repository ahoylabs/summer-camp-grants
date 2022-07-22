#!/usr/bin/env bash

set -e

# Use this script in place of calling `anchor` directly in order to always use
# the pinned version of anchor defined in env.ts in the root of the repo.

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

CURRENT_DIR=$PWD
PROJECT_DIR="$(dirname "$(dirname "$(realpath $0)")")"

cd "$PROJECT_DIR"

if [ -z "$ANCHOR_VERSION" ]; then
  echo "\$ANCHOR_VERSION not set" 1>&2
  exit 1
fi

echo "Anchor version:" "$ANCHOR_VERSION" 1>&2

# It would be preferable if avm had some equivalent of `rustup run ...` to be
# able to just run our desired version of anchor without messing with some
# settings global to the user (`avm use` writes the version to
# $HOME/.avm/.version so if you are using different anchor versions elsewhere
# this will mess with those settings).

avm use "$ANCHOR_VERSION" &>/dev/null ||
  # Since avm 0.24.0 it switches to the newly installed version after
  # installation finishes.
  avm install "$ANCHOR_VERSION"

anchor $@
RET=$?
exit $RET
