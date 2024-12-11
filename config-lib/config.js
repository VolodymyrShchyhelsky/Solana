// config.js
require('dotenv').config();
const { Connection } = require('@solana/web3.js');

// Load environment variables
const COMMITMENT_LEVEL = process.env.COMMITMENT_LEVEL || 'confirmed';
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;
const QUICKNODE_RPC_URL = process.env.QUICKNODE_RPC_URL;
const HELIUS_RPC_URL = process.env.HELIUS_RPC_URL;
const RPC_URL = process.env.RPC_URL || HELIUS_RPC_URL;

// Initialize Solana connection
const connection = new Connection(RPC_URL, COMMITMENT_LEVEL);

module.exports = {
  connection
};
