import { logger } from './helpers';
import { Token, TokenAmount } from '@raydium-io/raydium-sdk';
import { PublicKey } from '@solana/web3.js';

export class TokenCache {
  private readonly keys: Map<string, { pool : PublicKey}> 
    = new Map<string, { pool : PublicKey }>();

  public save(key: string, pool : PublicKey) {
    if (!this.keys.has(key)) {
      logger.trace(`Caching new token: ${key}`);
        this.keys.set(key, { pool });
    }
  }

  public get(key: string): { pool : PublicKey } {
    return this.keys.get(key)!;
  }
}