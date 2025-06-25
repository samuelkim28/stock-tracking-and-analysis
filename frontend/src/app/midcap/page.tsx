"use client";
import { useEffect, useMemo, useState } from "react";
import { Stock } from "@/types/stock";
import StockTable from "@/components/StockTable";
import { getCompareFunction, getApiEndpointForMultipleStocks, batchStocks } from "@/lib/helpers"
import DaysSelector from "@/components/DaysSelector";

const myStocks = ['AA', 'AAL', 'AAON', 'ACHC', 'ACI', 'ACM', 'ADC', 'AFG', 'AGCO', 'AIT', 'ALE', 'ALGM', 'ALK', 'ALLY', 'ALV', 'AM', 'AMED', 'AMG', 'AMH', 'AMKR', 'AN', 'ANF', 'APPF', 'AR', 'ARMK', 'ARW', 'ASB', 'ASGN', 'ASH', 'ATI', 'ATR', 'AVNT', 'AVT', 'AVTR', 'AXTA', 'AYI', 'BBWI', 'BC', 'BCO', 'BDC', 'BHF', 'BILL', 'BIO', 'BJ', 'BKH', 'BLD', 'BLKB', 'BMRN', 'BRBR', 'BRKR', 'BRX', 'BURL', 'BWXT', 'BYD', 'CACI', 'CADE', 'CAR', 'CART', 'CASY', 'CAVA', 'CBSH', 'CBT', 'CCK', 'CDP', 'CELH', 'CFR', 'CG', 'CGNX', 'CHDN', 'CHE', 'CHH', 'CHRD', 'CHWY', 'CHX', 'CIEN', 'CIVI', 'CLF', 'CLH', 'CMA', 'CMC', 'CNH', 'CNM', 'CNO', 'CNX', 'CNXC', 'COHR', 'COKE', 'COLB', 'COLM', 'COTY', 'CPRI', 'CR', 'CROX', 'CRS', 'CRUS', 'CSL', 'CUBE', 'CUZ', 'CVLT', 'CW', 'CXT', 'CYTK', 'DAR', 'DBX', 'DCI', 'DINO', 'DKS', 'DLB', 'DOCS', 'DOCU', 'DT', 'DTM', 'DUOL', 'EEFT', 'EGP', 'EHC', 'ELF', 'ELS', 'EME', 'ENS', 'ENSG', 'ENTG', 'EPR', 'EQH', 'ESAB', 'ESNT', 'EVR', 'EWBC', 'EXEL', 'EXLS', 'EXP', 'EXPO', 'FAF', 'FBIN', 'FCFS', 'FCN', 'FFIN', 'FHI', 'FHN', 'FIVE', 'FIX', 'FLEX', 'FLG', 'FLO', 'FLR', 'FLS', 'FN', 'FNB', 'FND', 'FNF', 'FOUR', 'FR', 'FYBR', 'G', 'GAP', 'GATX', 'GBCI', 'GEF', 'GGG', 'GHC', 'GLPI', 'GME', 'GMED', 'GNTX', 'GPK', 'GT', 'GTLS', 'GWRE', 'GXO', 'H', 'HAE', 'HALO', 'HGV', 'HIMS', 'HLI', 'HLNE', 'HOG', 'HOMB', 'HQY', 'HR', 'HRB', 'HWC', 'HXL', 'IBKR', 'IBOC', 'IDA', 'ILMN', 'INGR', 'IPGP', 'IRDM', 'IRT', 'ITT', 'JAZZ', 'JEF', 'JHG', 'JLL', 'KBH', 'KBR', 'KD', 'KEX', 'KMPR', 'KNF', 'KNSL', 'KNX', 'KRC', 'KRG', 'LAD', 'LAMR', 'LANC', 'LEA', 'LECO', 'LFUS', 'LITE', 'LIVN', 'LNTH', 'LNW', 'LOPE', 'LPX', 'LSCC', 'LSTR', 'M', 'MAN', 'MANH', 'MASI', 'MAT', 'MEDP', 'MIDD', 'MKSI', 'MLI', 'MMS', 'MORN', 'MSA', 'MSM', 'MTDR', 'MTG', 'MTN', 'MTSI', 'MTZ', 'MUR', 'MUSA', 'NBIX', 'NEU', 'NFG', 'NJR', 'NLY', 'NNN', 'NOV', 'NOVT', 'NSA', 'NSP', 'NVST', 'NVT', 'NWE', 'NXST', 'NXT', 'NYT', 'OC', 'OGE', 'OGS', 'OHI', 'OKTA', 'OLED', 'OLLI', 'OLN', 'ONB', 'ONTO', 'OPCH', 'ORA', 'ORI', 'OSK', 'OVV', 'OZK', 'PAG', 'PB', 'PBF', 'PCH', 'PCTY', 'PEGA', 'PEN', 'PFGC', 'PII', 'PK', 'PLNT', 'PNFP', 'POR', 'POST', 'POWI', 'PPC', 'PR', 'PRGO', 'PRI', 'PSN', 'PSTG', 'PVH', 'QLYS', 'R', 'RBA', 'RBC', 'REXR', 'RGA', 'RGEN', 'RGLD', 'RH', 'RLI', 'RMBS', 'RNR', 'ROIV', 'RPM', 'RRC', 'RRX', 'RS', 'RYAN', 'RYN', 'SAIA', 'SAIC', 'SAM', 'SATS', 'SBRA', 'SCI', 'SEIC', 'SF', 'SFM', 'SGI', 'SHC', 'SIGI', 'SKX', 'SLAB', 'SLGN', 'SLM', 'SMG', 'SNV', 'SNX', 'SON', 'SR', 'SRPT', 'SSB', 'SSD', 'ST', 'STAG', 'STWD', 'SWX', 'SYNA', 'TCBI', 'TEX', 'THC', 'THG', 'THO', 'TKR', 'TMHC', 'TNL', 'TOL', 'TREX', 'TTC', 'TTEK', 'TXNM', 'TXRH', 'UA', 'UAA', 'UBSI', 'UFPI', 'UGI', 'UMBF', 'UNM', 'USFD', 'UTHR', 'VAC', 'VAL', 'VC', 'VFC', 'VLY', 'VMI', 'VNO', 'VNOM', 'VNT', 'VOYA', 'VVV', 'WAL', 'WBS', 'WCC', 'WEN', 'WEX', 'WFRD', 'WH', 'WHR', 'WING', 'WLK', 'WMG', 'WMS', 'WPC', 'WSO', 'WTFC', 'WTRG', 'WTS', 'WU', 'WWD', 'X', 'XPO', 'XRAY', 'YETI', 'ZI', 'ZION']

export default function MidcapPage() {
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
      <h1 className="text-lg font-semibold">S&P MidCap 400</h1>  
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