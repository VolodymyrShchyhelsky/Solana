import { LiquidityStateV4, LiquidityPoolKeysV4 } from '@raydium-io/raydium-sdk';
import { logger } from './helpers';

export class PoolCache {
  private readonly keys: Map<string, { id: string; state: LiquidityStateV4; poolKeys: LiquidityPoolKeysV4 }> = new Map<
    string,
    { id: string; state: LiquidityStateV4; poolKeys: LiquidityPoolKeysV4}
  >();

  public save(id: string, state: LiquidityStateV4, poolKeys: LiquidityPoolKeysV4) {
    if (!this.keys.has(state.baseMint.toString())) {
      logger.trace(`Caching new pool for mint: ${state.baseMint.toString()}`);
      this.keys.set(state.baseMint.toString(), { id, state, poolKeys });
    }
  }

  public async get(mint: string): Promise<{ id: string; state: LiquidityStateV4; poolKeys: LiquidityPoolKeysV4 }> {
    return this.keys.get(mint)!;
  }
}
