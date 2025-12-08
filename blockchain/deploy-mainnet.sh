#!/bin/bash

# Deploy PongEscrow to Celo L2 Mainnet (OP Stack)
# ==================================================
# ⚠️  WARNING: This deploys to MAINNET with REAL CELO!
# ==================================================
# Prerequisites:
#   - Foundry installed (forge, cast)
#   - .env file with PRIVATE_KEY, BACKEND_ORACLE_ADDRESS, and CELO_MAINNET
#   - REAL CELO in your wallet

set -e  # Exit on any error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=========================================="
echo "🚀 Deploying PongEscrow to Celo L2 MAINNET"
echo "=========================================="
echo ""
echo "⚠️  WARNING: This will deploy to MAINNET!"
echo "   Real CELO will be spent for gas fees."
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Deployment cancelled."
    exit 0
fi

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with:"
    echo "  PRIVATE_KEY=your_private_key"
    echo "  BACKEND_ORACLE_ADDRESS=0x..."
    echo "  CELO_MAINNET=https://..."
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

if [ -z "$CELO_MAINNET" ]; then
    echo "❌ Error: CELO_MAINNET RPC URL not set in .env"
    exit 1
fi

RPC_URL="$CELO_MAINNET"
echo "🌐 RPC URL: $RPC_URL"

# Get deployer address
DEPLOYER_ADDRESS=$(cast wallet address --private-key $PRIVATE_KEY)
echo "📍 Deployer Address: $DEPLOYER_ADDRESS"

# Check balance
echo "💰 Checking balance..."
BALANCE=$(cast balance $DEPLOYER_ADDRESS --rpc-url "$RPC_URL")
BALANCE_ETH=$(cast from-wei $BALANCE)
echo "   Balance: $BALANCE_ETH CELO"

if [ "$BALANCE" = "0" ]; then
    echo "❌ Error: No CELO balance!"
    exit 1
fi

echo ""
echo "🔧 Backend Oracle: $BACKEND_ORACLE_ADDRESS"
echo ""

# Final confirmation
read -p "Deploy with the above configuration? (yes/no): " FINAL_CONFIRM

if [ "$FINAL_CONFIRM" != "yes" ]; then
    echo "❌ Deployment cancelled."
    exit 0
fi

# Deploy contract
echo "📦 Deploying contract..."
DEPLOY_OUTPUT=$(forge script script/Deploy.s.sol:DeployScript \
    --rpc-url "$RPC_URL" \
    --broadcast \
    --verify \
    --verifier blockscout \
    --verifier-url https://celo.blockscout.com/api \
    -vvvv 2>&1)

echo "$DEPLOY_OUTPUT"

# Extract deployed address from output
CONTRACT_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep -oP 'PongEscrow deployed at: \K0x[a-fA-F0-9]{40}' | head -1)

if [ -n "$CONTRACT_ADDRESS" ]; then
    echo ""
    echo "=========================================="
    echo "✅ MAINNET Deployment Successful!"
    echo "=========================================="
    echo "📄 Contract Address: $CONTRACT_ADDRESS"
    echo "🔍 View on Explorer: https://celo.blockscout.com/address/$CONTRACT_ADDRESS"
    echo ""
    echo "💡 If verification failed, you can verify manually:"
    echo "forge verify-contract $CONTRACT_ADDRESS src/PongEscrow.sol:PongEscrow \\"
    echo "    --verifier blockscout \\"
    echo "    --verifier-url https://celo.blockscout.com/api \\"
    echo "    --constructor-args \$(cast abi-encode \"constructor(address)\" $BACKEND_ORACLE_ADDRESS)"
else
    echo ""
    echo "⚠️  Could not extract contract address from output."
    echo "Check the deployment output above for the address."
fi
