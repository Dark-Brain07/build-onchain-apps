export type WagmiFetchBalanceResult = {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
};

/**
 * Formats an account balance for display.
 *
 * Takes a Wagmi balance result and returns a human-readable string
 * with the balance truncated to 5 characters followed by the token symbol.
 *
 * @param data - The balance data from Wagmi's fetchBalance
 * @returns A formatted string like "0.097 ETH" or "undefined undefined" if data is missing
 *
 * @example
 * ```typescript
 * const balance = getAccountBalance({
 *   decimals: 18,
 *   formatted: '0.097970395124611628',
 *   symbol: 'ETH',
 *   value: 97970395124611628n,
 * });
 * // Returns: "0.097 ETH"
 * ```
 */
export const getAccountBalance = (data?: WagmiFetchBalanceResult) => {
  return `${data?.formatted.slice(0, 5)} ${data?.symbol}`;
};
