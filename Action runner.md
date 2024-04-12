# Create a folder

mkdir actions-runner && cd actions-runner

# Download the latest runner package

curl -o actions-runner-linux-x64-2.315.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.315.0/actions-runner-linux-x64-2.315.0.tar.gz

# Optional: Validate the hash

echo "6362646b67613c6981db76f4d25e68e463a9af2cc8d16e31bfeabe39153606a0 actions-runner-linux-x64-2.315.0.tar.gz" | shasum -a 256 -c

# Extract the installer

tar xzf ./actions-runner-linux-x64-2.315.0.tar.gz
