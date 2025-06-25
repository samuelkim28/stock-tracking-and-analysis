import { Stock } from "@/types/stock";

export function getCompareFunction(stockDifferentiator: keyof Stock) {
  return (stock: Stock, stock2: Stock) => (stock2[stockDifferentiator] as number) - (stock[stockDifferentiator] as number); 
}

export function getApiEndpoint(symbol: string, currAdapcDays: number, currAdpcDays: number, currAdvDays: number) {
  return `http://127.0.0.1:5000/stock/${symbol}?adapcDays=${currAdapcDays}&adpcDays=${currAdpcDays}&advDays=${currAdvDays}`;
  //return `https://stock-tracking-and-analysis.onrender.com/stock/${symbol}?adapcDays=${currAdapcDays}&adpcDays=${currAdpcDays}&advDays=${currAdvDays}`;
}

export function getApiEndpointForMultipleStocks(stocksString: string, currAdapcDays: number, currAdpcDays: number, currAdvDays: number) {
  return `http://127.0.0.1:5000/stocks?symbols=${stocksString}&adapcDays=${currAdapcDays}&adpcDays=${currAdpcDays}&advDays=${currAdvDays}`;
  //return `https://stock-tracking-and-analysis.onrender.com/stocks?symbols=${stocksString}&adapcDays=${currAdapcDays}&adpcDays=${currAdpcDays}&advDays=${currAdvDays}`;
}

export function batchStocks(stockList: string[], batchSize = 50) {
  const batches = [];
  for (let i = 0; i < stockList.length; i += batchSize) {
    batches.push(stockList.slice(i, i + batchSize));
  }
  return batches;
}