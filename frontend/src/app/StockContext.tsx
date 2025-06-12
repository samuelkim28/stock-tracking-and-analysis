import { createContext } from 'react';
import { Stock } from '@/types/stock';

type StockContextType = {
  currStocks: Stock[];
  addStock: (stock: Stock) => void;
};

export const LevelContext = createContext<StockContextType | null>(null);