"use client";
import { useEffect, useMemo, useState } from "react";
import { Stock } from "@/types/stock";
import StockTable from "@/components/StockTable";
import WatchlistForm from "./WatchlistForm";
import { getCompareFunction, getApiEndpoint } from "@/lib/helpers"
import DaysSelector from "@/components/DaysSelector";

function getStocksFromLocalStorage() {
  const currStocks : Stock[] = [];
  for (const stock of Object.values(localStorage)) {
    currStocks.push(JSON.parse(stock));
  }
  return currStocks;
}

export default function WatchlistPage() {
  const [currStocks, setCurrStocks] = useState<Stock[]>([]);
  const [currSortBy, setCurrSortBy] = useState<string>("currentPrice");
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
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
    const stocksFromLocalStorage = getStocksFromLocalStorage();
    setCurrStocks(stocksFromLocalStorage);
  }, []);

  useEffect(() => {
    const fetchStocksData = async () => {
      try {
        setIsLoading(true);
        const responses = await Promise.all(
          Object.keys(localStorage).map(symbol =>
            fetch(getApiEndpoint(symbol, currAdapcDays, currAdpcDays, currAdvDays)).then(res => res.json())
          )
        );
        setCurrStocks(responses);
      } catch (err) {
        console.error("Failed to fetch stock data:", err);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchStocksData(); 
  }, [currAdapcDays, currAdpcDays, currAdvDays]);

  const fetchAndStoreStockData = async (symbol: string) => {
    try {
      fetch(getApiEndpoint(symbol, currAdapcDays, currAdpcDays, currAdvDays))
        .then(res => res.json())
        .then(stockData => {
          if (stockData["currentPrice"] > 0) {
            setCurrStocks(prevStocks => {
              const newStocksList: Stock[] = [...prevStocks, stockData as Stock];
              return newStocksList;
            })      
            localStorage.setItem(symbol, JSON.stringify(stockData));  
            getStocksFromLocalStorage();    
          }
        })
    } catch (err) {
      console.error("Failed to fetch stock data:", err);
    }
  };  

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    fetchAndStoreStockData(input);
    setInput("");
  };  

  const handleClear = () => {
    setCurrStocks([]);
    localStorage.clear();
  };

  const handleRemove = (stockToRemove: string) => {
    setCurrStocks(prevStocks => {
      const newStocks = [];
      for (const stock of prevStocks) {
        if (stock["ticker"] != stockToRemove) {
          newStocks.push(stock);
        }
      }
      return newStocks;
    })
    localStorage.removeItem(stockToRemove);
  }

  const sortedStocks = useMemo(() => {
    const compareFunction = getCompareFunction(currSortBy as keyof Stock);
    return [...currStocks].sort(compareFunction);
  }, [currStocks, currSortBy]);

  return (
    <>
      <h1 className="text-lg font-semibold mb-2">Watchlist</h1>  
      <WatchlistForm input={input} setInput={setInput} handleClear={handleClear} handleSubmit={handleSubmit}/>
      <br></br>
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-blue-600 font-medium">Loading stock data...</span>
        </div>
      ) : (
        <StockTable 
          sortedStocks={sortedStocks} 
          setCurrSortBy={setCurrSortBy} 
          handleRemove={handleRemove}
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