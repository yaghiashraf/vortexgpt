
import { describe, it, expect } from 'vitest';
import { getMarketData } from './market-data';

describe('getMarketData', () => {
  it('should return mock data when no API key is present', async () => {
    const ticker = 'TEST';
    const data = await getMarketData(ticker);

    expect(data).toBeDefined();
    expect(data.price).toBeGreaterThan(0);
    expect(data.volume).toBeGreaterThan(0);
    expect(data.open).toBeDefined();
    expect(data.high).toBeDefined();
    expect(data.low).toBeDefined();
  });
});
