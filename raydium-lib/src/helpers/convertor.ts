import BN from 'bn.js';
import { LIQUIDITY_STATE_LAYOUT_V4, MARKET_STATE_LAYOUT_V3 } from '@raydium-io/raydium-sdk';
import { PublicKey } from '@solana/web3.js';

export function constructLiquidityStateFromJSON(jsonString: string) {
    const jsonObject = JSON.parse(jsonString);
  
    const layoutObject = {
      status: new BN(jsonObject.status, 16),
      nonce: new BN(jsonObject.nonce, 16),
      maxOrder: new BN(jsonObject.maxOrder, 16),
      depth: new BN(jsonObject.depth, 16),
      baseDecimal: new BN(jsonObject.baseDecimal, 16),
      quoteDecimal: new BN(jsonObject.quoteDecimal, 16),
      state: new BN(jsonObject.state, 16),
      resetFlag: new BN(jsonObject.resetFlag, 16),
      minSize: new BN(jsonObject.minSize, 16),
      volMaxCutRatio: new BN(jsonObject.volMaxCutRatio, 16),
      amountWaveRatio: new BN(jsonObject.amountWaveRatio, 16),
      baseLotSize: new BN(jsonObject.baseLotSize, 16),
      quoteLotSize: new BN(jsonObject.quoteLotSize, 16),
      minPriceMultiplier: new BN(jsonObject.minPriceMultiplier, 16),
      maxPriceMultiplier: new BN(jsonObject.maxPriceMultiplier, 16),
      systemDecimalValue: new BN(jsonObject.systemDecimalValue, 16),
      minSeparateNumerator: new BN(jsonObject.minSeparateNumerator, 16),
      minSeparateDenominator: new BN(jsonObject.minSeparateDenominator, 16),
      tradeFeeNumerator: new BN(jsonObject.tradeFeeNumerator, 16),
      tradeFeeDenominator: new BN(jsonObject.tradeFeeDenominator, 16),
      pnlNumerator: new BN(jsonObject.pnlNumerator, 16),
      pnlDenominator: new BN(jsonObject.pnlDenominator, 16),
      swapFeeNumerator: new BN(jsonObject.swapFeeNumerator, 16),
      swapFeeDenominator: new BN(jsonObject.swapFeeDenominator, 16),
      baseNeedTakePnl: new BN(jsonObject.baseNeedTakePnl, 16),
      quoteNeedTakePnl: new BN(jsonObject.quoteNeedTakePnl, 16),
      quoteTotalPnl: new BN(jsonObject.quoteTotalPnl, 16),
      baseTotalPnl: new BN(jsonObject.baseTotalPnl, 16),
      poolOpenTime: new BN(jsonObject.poolOpenTime, 16),
      punishPcAmount: new BN(jsonObject.punishPcAmount, 16),
      punishCoinAmount: new BN(jsonObject.punishCoinAmount, 16),
      orderbookToInitTime: new BN(jsonObject.orderbookToInitTime, 16),
      swapBaseInAmount: new BN(jsonObject.swapBaseInAmount, 16),
      swapQuoteOutAmount: new BN(jsonObject.swapQuoteOutAmount, 16),
      swapBase2QuoteFee: new BN(jsonObject.swapBase2QuoteFee, 16),
      swapQuoteInAmount: new BN(jsonObject.swapQuoteInAmount, 16),
      swapBaseOutAmount: new BN(jsonObject.swapBaseOutAmount, 16),
      swapQuote2BaseFee: new BN(jsonObject.swapQuote2BaseFee, 16),
      baseVault: new PublicKey(jsonObject.baseVault),
      quoteVault: new PublicKey(jsonObject.quoteVault),
      baseMint: new PublicKey(jsonObject.baseMint),
      quoteMint: new PublicKey(jsonObject.quoteMint),
      lpMint: new PublicKey(jsonObject.lpMint),
      openOrders: new PublicKey(jsonObject.openOrders),
      marketId: new PublicKey(jsonObject.marketId),
      marketProgramId: new PublicKey(jsonObject.marketProgramId),
      targetOrders: new PublicKey(jsonObject.targetOrders),
      withdrawQueue: new PublicKey(jsonObject.withdrawQueue),
      lpVault: new PublicKey(jsonObject.lpVault),
      owner: new PublicKey(jsonObject.owner),
      lpReserve: new BN(jsonObject.lpReserve, 16),
      padding: jsonObject.padding.map((pad: any) => new BN(pad, 16)),
    };
  
    const buffer = Buffer.alloc(LIQUIDITY_STATE_LAYOUT_V4.span);
    LIQUIDITY_STATE_LAYOUT_V4.encode(layoutObject, buffer);
  
    return LIQUIDITY_STATE_LAYOUT_V4.decode(buffer);
  }
  
  export function constructMarketStateFromJSON(jsonString: string) {
    const jsonObject = JSON.parse(jsonString);
  
    // Manually map each field to ensure proper types
    const layoutObject = {
      ownAddress: new PublicKey(jsonObject.ownAddress),
      vaultSignerNonce: new BN(jsonObject.vaultSignerNonce, 16),
      baseMint: new PublicKey(jsonObject.baseMint),
      quoteMint: new PublicKey(jsonObject.quoteMint),
      baseVault: new PublicKey(jsonObject.baseVault),
      baseDepositsTotal: new BN(jsonObject.baseDepositsTotal, 16),
      baseFeesAccrued: new BN(jsonObject.baseFeesAccrued, 16),
      quoteVault: new PublicKey(jsonObject.quoteVault),
      quoteDepositsTotal: new BN(jsonObject.quoteDepositsTotal, 16),
      quoteFeesAccrued: new BN(jsonObject.quoteFeesAccrued, 16),
      quoteDustThreshold: new BN(jsonObject.quoteDustThreshold, 16),
      requestQueue: new PublicKey(jsonObject.requestQueue),
      eventQueue: new PublicKey(jsonObject.eventQueue),
      bids: new PublicKey(jsonObject.bids),
      asks: new PublicKey(jsonObject.asks),
      baseLotSize: new BN(jsonObject.baseLotSize, 16),
      quoteLotSize: new BN(jsonObject.quoteLotSize, 16),
      feeRateBps: new BN(jsonObject.feeRateBps, 16),
      referrerRebatesAccrued: new BN(jsonObject.referrerRebatesAccrued, 16),
    };
  
    // Serialize to buffer
    const buffer = Buffer.alloc(MARKET_STATE_LAYOUT_V3.span);
    MARKET_STATE_LAYOUT_V3.encode(layoutObject, buffer);
  
    // Decode the struct from buffer
    return MARKET_STATE_LAYOUT_V3.decode(buffer);
  }