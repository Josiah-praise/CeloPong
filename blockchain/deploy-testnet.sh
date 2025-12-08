#!/bin/bash

# Deploy PongEscrow to Celo Alfajores Testnet
# ==================================================
# Prerequisites:
#   - Foundry installed (forge, cast)
#   - .env file with PRIVATE_KEY and BACKEND_ORACLE_ADDRESS
#   - Test CELO in your wallet (get from https://faucet.celo.org/alfajores)

set -e  # Exit on any error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=========================================="
echo "🚀 Deploying PongEscrow to Celo Alfajores"
echo "=========================================="

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with:"
    echo "  PRIVATE_KEY=your_private_key"
    echo "  BACKEND_ORACLE_ADDRESS=0x..."
    exit 1
fi

# Validate required environment variables
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Error: PRIVATE_KEY not set in .env"
    exit 1
fi

if [ -z "$BACKEND_ORACLE_ADDRESS" ]; then
    echo "❌ Error: BACKEND_ORACLE_ADDRESS not set in .env"
    exit 1
fi

# Get deployer address
DEPLOYER_ADDRESS=$(cast wallet address --private-key $PRIVATE_KEY)
echo "📍 Deployer Address: $DEPLOYER_ADDRESS"

# Check balance
echo "💰 Checking balance..."
BALANCE=$(cast balance $DEPLOYER_ADDRESS --rpc-url https://alfajores-forno.celo-testnet.org)
echo "   Balance: $BALANCE wei"

if [ "$BALANCE" = "0" ]; then
    echo "❌ Error: No CELO balance! Get test CELO from https://faucet.celo.org/alfajores"
    exit 1
fi

echo ""
echo "🔧 Backend Oracle: $BACKEND_ORACLE_ADDRESS"
echo ""

# Deploy contract
echo "📦 Deploying contract..."
DEPLOY_OUTPUT=$(forge script script/Deploy.s.sol:DeployScript \
    --rpc-url https://alfajores-forno.celo-testnet.org \
    --broadcast \
    --verify \
    --verifier blockscout \
    --verifier-url https://explorer.celo.org/alfajores/api \
    -vvvv 2>&1)

echo "$DEPLOY_OUTPUT"

# Extract deployed address from output
CONTRACT_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep -oP 'PongEscrow deployed at: \K0x[a-fA-F0-9]{40}' | head -1)

if [ -n "$CONTRACT_ADDRESS" ]; then
    echo ""
    echo "=========================================="
    echo "✅ Deployment Successful!"
    echo "=========================================="
    echo "📄 Contract Address: $CONTRACT_ADDRESS"
    echo "🔍 View on Explorer: https://alfajores.celoscan.io/address/$CONTRACT_ADDRESS"
    echo ""
    echo "💡 If verification failed, you can verify manually:"
    echo "forge verify-contract $CONTRACT_ADDRESS src/PongEscrow.sol:PongEscrow \\"
    echo "    --verifier blockscout \\"
    echo "    --verifier-url https://explorer.celo.org/alfajores/api \\"
    echo "    --constructor-args \$(cast abi-encode \"constructor(address)\" $BACKEND_ORACLE_ADDRESS)"
else
    echo ""
    echo "⚠️  Could not extract contract address from output."
    echo "Check the deployment output above for the address."
fi
