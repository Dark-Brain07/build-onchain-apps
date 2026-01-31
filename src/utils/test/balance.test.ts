import { getAccountBalance } from '../balance';

describe('getAccountBalance', () => {
  it('should format balance with standard ETH value', () => {
    const wagmiFetchBalanceResult = {
      decimals: 18,
      formatted: '0.097970395124611628',
      symbol: 'ETH',
      value: 97970395124611628n,
    };
    const accountBalance = getAccountBalance(wagmiFetchBalanceResult);
    expect(accountBalance).toEqual('0.097 ETH');
  });

  it('should handle undefined data gracefully', () => {
    const accountBalance = getAccountBalance(undefined);
    expect(accountBalance).toEqual('undef undefined');
  });

  it('should format balance with different token symbols', () => {
    const usdcBalance = {
      decimals: 6,
      formatted: '1234.567890',
      symbol: 'USDC',
      value: 1234567890n,
    };
    expect(getAccountBalance(usdcBalance)).toEqual('1234. USDC');
  });

  it('should handle zero balance correctly', () => {
    const zeroBalance = {
      decimals: 18,
      formatted: '0.000000000000000000',
      symbol: 'ETH',
      value: 0n,
    };
    expect(getAccountBalance(zeroBalance)).toEqual('0.000 ETH');
  });

  it('should handle large balance values', () => {
    const largeBalance = {
      decimals: 18,
      formatted: '12345.6789',
      symbol: 'ETH',
      value: 12345678900000000000000n,
    };
    expect(getAccountBalance(largeBalance)).toEqual('12345 ETH');
  });

  it('should truncate balance to exactly 5 characters', () => {
    const balance = {
      decimals: 18,
      formatted: '0.123456789',
      symbol: 'WETH',
      value: 123456789000000000n,
    };
    expect(getAccountBalance(balance)).toEqual('0.123 WETH');
  });
});
