import { Stock } from "@/types/stock";

export default function getCompareFunction(stockDifferentiator: keyof Stock) {
  return (stock: Stock, stock2: Stock) => (stock2[stockDifferentiator] as number) - (stock[stockDifferentiator] as number); 
}