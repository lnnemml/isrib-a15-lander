export async function getCryptoRates(amountUsd: number): Promise<{
  btcEquivalent: string;
  ltcEquivalent: string;
}> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,litecoin&vs_currencies=usd',
      { cache: 'no-store' }
    );
    if (!res.ok) throw new Error('CoinGecko error');
    const data = await res.json() as {
      bitcoin: { usd: number };
      litecoin: { usd: number };
    };
    const btc = (amountUsd / data.bitcoin.usd).toFixed(6);
    const ltc = (amountUsd / data.litecoin.usd).toFixed(4);
    return { btcEquivalent: btc, ltcEquivalent: ltc };
  } catch {
    return { btcEquivalent: '', ltcEquivalent: '' };
  }
}
