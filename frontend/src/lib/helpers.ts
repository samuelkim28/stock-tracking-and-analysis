import { Stock } from "@/types/stock";

export function getCompareFunction(stockDifferentiator: keyof Stock) {
  return (stock: Stock, stock2: Stock) => (stock2[stockDifferentiator] as number) - (stock[stockDifferentiator] as number); 
}

export function getApiEndpoint(symbol: string, currAdapcDays: number, currAdpcDays: number, currAdvDays: number) {
  //return `http://127.0.0.1:5000/${symbol}?adapcDays=${currAdapcDays}&adpcDays=${currAdpcDays}&advDays=${currAdvDays}`;
  return `https://stock-tracking-and-analysis.onrender.com/${symbol}?adapcDays=${currAdapcDays}&adpcDays=${currAdpcDays}&advDays=${currAdvDays}`;
}