import { PublicKey } from '@solana/web3.js';
import { Liquidity, LiquidityStateV4, LiquidityPoolKeysV4, createPoolKeys } from '@raydium-io/raydium-sdk';
import { logger } from './logger'; // Assuming a logger utility
import { MarketCache } from './market.cache';
import { PoolCache } from './pool.cache';
import { TokenCache } from './token.cache';


export class CacheService {
    private marketCache: MarketCache;
    private poolCache: PoolCache;
    private tokenCache: TokenCache;

    constructor() {
        this.marketCache = new MarketCache();
        this.poolCache = new PoolCache();
        this.tokenCache = new TokenCache();

        const raydiumApi = new raydiumV2.Api({
            cluster: "mainnet", // Mainnet cluster
            timeout: 5000, // Timeout in milliseconds
        });
    }


    async addPoolToCache(poolId: PublicKey) {
        logger.info(`Processing new pool for ${poolId.toString()}...`);

        const accountInfo = await connection.getAccountInfo(poolId);
        const poolState = LIQUIDITY_STATE_LAYOUT_V4.decode(accountInfo.data);

        // Retrieve the market data for the pool's market ID
        const market = await this.marketCache.get(poolState.marketId.toString());

        // Create pool keys
        const poolKeys: LiquidityPoolKeysV4 = createPoolKeys(poolId, poolState, market);

        // Save the pool in the cache
        this.poolCache.save(poolId.toString(), poolState, poolKeys);

        logger.info(`Pool ${poolId.toString()} added to cache successfully.`);
    }

    /**
     * Updates the caches based on a given token mint.
     *
     * @param tokenMint - The mint address of the token.
     */
    async updateCachesFromTokenMint(tokenMint: PublicKey) {


        // Fetch the pool for mint2 and SOL
        const tokenPool = normalizeRaydiumBetaPoolInfoResponse(
            await raydiumApi.fetchPoolByMints({
                mint1: raydiumV2.WSOLMint.toBase58(), // SOL mint
                mint2: mint2Address, // Token mint
                type: raydiumV2.PoolFetchType.Standard, // Pool fetch type
            })
        ).find(p =>
            p.mintA.address === mint2Address || p.mintB.address === mint2Address,
        );

        if (!tokenPool) {
            console.error("Unable to find a pool for the token and SOL.");
            return null;
        }

        const poolAddress = new PublicKey(tokenPool.poolAddress);
        this.tokenCache.save(tokenMint.toBase58(), poolAddress);
        addPoolToCache(poolAddress);
    }

    function normalizeRaydiumBetaPoolInfoResponse(response) {
        if (response === null || typeof response !== "object") {
            return [];
        }
    
        const items = (Array.isArray(response) ? response
            : (!Array.isArray((response).data) ? []
                : (response).data)) || [];
    
        console.log("Items:", JSON.stringify(items, null, 2));
    
        return items
            .filter(p =>
                (p !== null && typeof p === "object")
                && (!!p.price && (!!p.mintAmountA && !!p.mintAmountB))
                && (p.mintA !== null && typeof p.mintA === "object")
                && (p.mintB !== null && typeof p.mintB === "object"))
            .map(p => ({
                poolAddress: p.id, // Extract poolAddress if it exists

            }));
    }

    public async getPrice(poolKeys : LiquidityPoolKeysV4) {
        const poolInfo = await Liquidity.fetchInfo({
          connection: this.connection,
          poolKeys,
        });
    
        if (poolInfo.quoteReserve.toNumber() < 1) {
          return 0.0; //RugPull
        }
        return parseFloat(Liquidity.getRate(poolInfo).toSignificant());
    }
}
