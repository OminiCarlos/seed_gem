#!/bin/bash

# File path
ENV_SERVER_PATH="./.env"

# Load environment variables from the .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo ".env file not found. Please create one with SUPABASE_URL, SUPABASE_KEY, and PORT."
    exit 1
fi

# Define a range
START=50000
END=60000

# Loop through the range and check if the port is in use
for PORT in $(seq $START $END); do
    # Check if the port is in use
    if ! ss -tuln | grep :$PORT > /dev/null; then
        # Bind to the port using a temporary process
        # nc -l -p $PORT &
        # TEMP_PID=$!

        # Update the port number in the .env file
        sed -i "/^PORT=/c\PORT=$PORT" $ENV_SERVER_PATH
        echo "Updated $ENV_SERVER_PATH with PORT=$PORT."

        # Kill the temporary process
        # kill $TEMP_PID

        # Replace the bash process with the Node process
        exec node server.js
        break
    fi
done

