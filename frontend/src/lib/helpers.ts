import { Stock } from "@/types/stock";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function getCompareFunction(stockDifferentiator: keyof Stock) {
  return (stock: Stock, stock2: Stock) => (stock2[stockDifferentiator] as number) - (stock[stockDifferentiator] as number); 
}

export function getApiEndpoint(symbol: string, currAdapcDays: number, currAdpcDays: number, currAdvDays: number) {
  return `${API_BASE_URL}/stock/${symbol}?adapcDays=${currAdapcDays}&adpcDays=${currAdpcDays}&advDays=${currAdvDays}`;
}

export function getApiEndpointForMultipleStocks(stocksString: string, currAdapcDays: number, currAdpcDays: number, currAdvDays: number) {
  return `${API_BASE_URL}/stocks?symbols=${stocksString}&adapcDays=${currAdapcDays}&adpcDays=${currAdpcDays}&advDays=${currAdvDays}`;
}

export function batchStocks(stockList: string[], batchSize = 50) {
  const batches = [];
  for (let i = 0; i < stockList.length; i += batchSize) {
    batches.push(stockList.slice(i, i + batchSize));
  }
  return batches;
}