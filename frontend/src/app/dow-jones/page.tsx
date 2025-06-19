"use client";
import { useEffect, useMemo, useState } from "react";
import { Stock } from "@/types/stock";
import StockTable from "@/components/StockTable";
import { getCompareFunction, getApiEndpointForMultipleStocks, batchStocks } from "@/lib/helpers"
import DaysSelector from "@/components/DaysSelector";

const myStocks = ['AAPL', 'AMGN', 'AMZN', 'AXP', 'BA', 'CAT', 'CRM', 'CSCO', 'CVX', 'DIS', 'GS', 'HD', 'HON', 'IBM', 'JNJ', 'JPM', 'KO', 'MCD', 'MMM', 'MRK', 'MSFT', 'NKE', 'NVDA', 'PG', 'SHW', 'TRV', 'UNH', 'V', 'VZ', 'WMT']

export default function DowJonesPage() {
  const [originalStockList, setOriginalStockList] = useState<Stock[]>([]);
  const [currSortBy, setCurrSortBy] = useState<string>("currentPrice");
  const [isLoading, setIsLoading] = useState(true);
  const [currAdapcDays, setCurrAdapcDays] = useState(5);
  const [currAdpcDays, setCurrAdpcDays] = useState(5);
  const [currAdvDays, setCurrAdvDays] = useState(5);

  function handleDaysSelect(value: string, setStateFunction: (num_days: number) => void) {
    setStateFunction(parseInt(value));
  }
  const adapcDaysSelector = <DaysSelector handleDaysSelect={handleDaysSelect} setStateFn={setCurrAdapcDays} currDays={currAdapcDays}/>
  const adpcDaysSelector = <DaysSelector handleDaysSelect={handleDaysSelect} setStateFn={setCurrAdpcDays} currDays={currAdpcDays}/>
  const advDaysSelector = <DaysSelector handleDaysSelect={handleDaysSelect} setStateFn={setCurrAdvDays} currDays={currAdvDays}/>

  useEffect(() => {
    const fetchStocksData = async () => {
      try {
        setIsLoading(true);
        const batches = batchStocks(myStocks);
        const retrievedStockList: Stock[] = [];

        for (const batch of batches) {
          const stocksString = batch.join();
          const resp = await fetch(getApiEndpointForMultipleStocks(stocksString, currAdapcDays, currAdpcDays, currAdvDays));
          const data = await resp.json();
          const stocks = Object.values(data) as Stock[];
          retrievedStockList.push(...stocks);
        }
        const validStocks = retrievedStockList.filter(stock => stock.ticker && typeof stock.ticker === 'string');
        setOriginalStockList(validStocks);
      } catch (err) {
        console.error("Failed to fetch stock data:", err);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchStocksData(); 

    const intervalId = setInterval(fetchStocksData, 15 * 60 * 1000); // every 15 minutes

    return () => clearInterval(intervalId); 
  }, [currAdapcDays, currAdpcDays, currAdvDays]);


  const sortedStocks = useMemo(() => {
    const compareFunction = getCompareFunction(currSortBy as keyof Stock);
    return [...originalStockList].sort(compareFunction);
  }, [originalStockList, currSortBy]);

  return (
    <>
      <h1 className="font-bold pb-3">Dow Jones</h1>  
      <br></br>
      {isLoading ? (
        <p>Loading stock data...</p>
      ) : (
        <StockTable 
          sortedStocks={sortedStocks} 
          setCurrSortBy={setCurrSortBy} 
          adapcDaysSelector={adapcDaysSelector} 
          adpcDaysSelector={adpcDaysSelector}
          advDaysSelector={advDaysSelector}
        />       
      )}
      <br></br>
      <p>ADAPC: Average daily absolute percent change -- a measure of volatility of a stock</p>
      <p>ADPC: Average daily percent change -- expected daily percent change of a stock, can be positive or negative</p>
      <p>ADV: Average daily volume</p>
    </>
  );
}