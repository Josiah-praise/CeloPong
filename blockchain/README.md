## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Deployed Contracts

### PongEscrow

| Network | Chain ID | Contract Address | Explorer |
|---------|----------|------------------|----------|
| **Celo L2 Mainnet** | 42220 | `0xE6f51532302eA8FF479D419e1a7B5F88eC864997` | [View on Blockscout](https://celo.blockscout.com/address/0xE6f51532302eA8FF479D419e1a7B5F88eC864997) |
| **Celo L2 Sepolia** (testnet) | 11142220 | `0xed6526b64cd5572beef66eef2ae1ff5b106299e4` | [View on Blockscout](https://celo-sepolia.blockscout.com/address/0xed6526b64cd5572beef66eef2ae1ff5b106299e4) |

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
