export const PRODUCTS = [
  {
    id: '500mg',
    name: 'ISRIB A15 500mg powder',
    price: 130,
    description: '~65–100 doses at 5–10mg',
    popular: false,
  },
  {
    id: '1g',
    name: 'ISRIB A15 1g powder',
    price: 200,
    description: '~100–200 doses at 5–10mg',
    popular: false,
  },
  {
    id: '25caps',
    name: 'ISRIB A15 25 capsules (20mg)',
    price: 170,
    description: 'Pre-dosed, no measuring required',
    popular: false,
  },
  {
    id: '50caps',
    name: 'ISRIB A15 50 capsules (20mg)',
    price: 240,
    description: 'Best value — 50 pre-dosed capsules',
    popular: true,
  },
] as const;

export type ProductId = typeof PRODUCTS[number]['id'];

export const CRYPTO_DISCOUNT = 0.10; // 10% discount for crypto

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export function getCryptoPrice(basePrice: number): number {
  return Math.round(basePrice * (1 - CRYPTO_DISCOUNT) * 100) / 100;
}
