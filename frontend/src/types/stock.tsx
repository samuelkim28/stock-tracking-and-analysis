export type Stock = {
  ticker: string;
  currentPrice: number | null;
  previousClose: number | null;
  open: number | null;
  dayHigh: number | null;
  dayLow: number | null;
  volume: number | null;
  adapc: number | null;
  adpc: number | null;
  averageVolume: number | null;
  peRatio: number | null;
  eps: number | null;
  priceChange: number | null;
  currency: string | null;
  longName: string | null;
};