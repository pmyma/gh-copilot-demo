#!/bin/bash

# Script to build and test album-api-v2

echo "=== Building album-api-v2 ==="
cd album-api-v2
npx tsc

if [ $? -eq 0 ]; then
    echo "✓ Build successful"
    echo ""
    echo "=== Running tests ==="
    npm test
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✓ All tests passed!"
        echo ""
        echo "=== Starting server ==="
        echo "To start the API server, run: npm run dev"
    fi
else
    echo "✗ Build failed"
    exit 1
fi
