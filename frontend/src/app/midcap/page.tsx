"use client";
import { useEffect, useMemo, useState } from "react";

const myStocks = ['AA', 'AAL', 'AAON', 'ACHC', 'ACI', 'ACM', 'ADC', 'AFG', 'AGCO', 'AIT', 'ALE', 'ALGM', 'ALK', 'ALLY', 'ALV', 'AM', 'AMED', 'AMG', 'AMH', 'AMKR', 'AN', 'ANF', 'APPF', 'AR', 'ARMK', 'ARW', 'ASB', 'ASGN', 'ASH', 'ATI', 'ATR', 'AVNT', 'AVT', 'AVTR', 'AXTA', 'AYI', 'BBWI', 'BC', 'BCO', 'BDC', 'BHF', 'BILL', 'BIO', 'BJ', 'BKH', 'BLD', 'BLKB', 'BMRN', 'BRBR', 'BRKR', 'BRX', 'BURL', 'BWXT', 'BYD', 'CACI', 'CADE', 'CAR', 'CART', 'CASY', 'CAVA', 'CBSH', 'CBT', 'CCK', 'CDP', 'CELH', 'CFR', 'CG', 'CGNX', 'CHDN', 'CHE', 'CHH', 'CHRD', 'CHWY', 'CHX', 'CIEN', 'CIVI', 'CLF', 'CLH', 'CMA', 'CMC', 'CNH', 'CNM', 'CNO', 'CNX', 'CNXC', 'COHR', 'COKE', 'COLB', 'COLM', 'COTY', 'CPRI', 'CR', 'CROX', 'CRS', 'CRUS', 'CSL', 'CUBE', 'CUZ', 'CVLT', 'CW', 'CXT', 'CYTK', 'DAR', 'DBX', 'DCI', 'DINO', 'DKS', 'DLB', 'DOCS', 'DOCU', 'DT', 'DTM', 'DUOL', 'EEFT', 'EGP', 'EHC', 'ELF', 'ELS', 'EME', 'ENS', 'ENSG', 'ENTG', 'EPR', 'EQH', 'ESAB', 'ESNT', 'EVR', 'EWBC', 'EXEL', 'EXLS', 'EXP', 'EXPO', 'FAF', 'FBIN', 'FCFS', 'FCN', 'FFIN', 'FHI', 'FHN', 'FIVE', 'FIX', 'FLEX', 'FLG', 'FLO', 'FLR', 'FLS', 'FN', 'FNB', 'FND', 'FNF', 'FOUR', 'FR', 'FYBR', 'G', 'GAP', 'GATX', 'GBCI', 'GEF', 'GGG', 'GHC', 'GLPI', 'GME', 'GMED', 'GNTX', 'GPK', 'GT', 'GTLS', 'GWRE', 'GXO', 'H', 'HAE', 'HALO', 'HGV', 'HIMS', 'HLI', 'HLNE', 'HOG', 'HOMB', 'HQY', 'HR', 'HRB', 'HWC', 'HXL', 'IBKR', 'IBOC', 'IDA', 'ILMN', 'INGR', 'IPGP', 'IRDM', 'IRT', 'ITT', 'JAZZ', 'JEF', 'JHG', 'JLL', 'KBH', 'KBR', 'KD', 'KEX', 'KMPR', 'KNF', 'KNSL', 'KNX', 'KRC', 'KRG', 'LAD', 'LAMR', 'LANC', 'LEA', 'LECO', 'LFUS', 'LITE', 'LIVN', 'LNTH', 'LNW', 'LOPE', 'LPX', 'LSCC', 'LSTR', 'M', 'MAN', 'MANH', 'MASI', 'MAT', 'MEDP', 'MIDD', 'MKSI', 'MLI', 'MMS', 'MORN', 'MSA', 'MSM', 'MTDR', 'MTG', 'MTN', 'MTSI', 'MTZ', 'MUR', 'MUSA', 'NBIX', 'NEU', 'NFG', 'NJR', 'NLY', 'NNN', 'NOV', 'NOVT', 'NSA', 'NSP', 'NVST', 'NVT', 'NWE', 'NXST', 'NXT', 'NYT', 'OC', 'OGE', 'OGS', 'OHI', 'OKTA', 'OLED', 'OLLI', 'OLN', 'ONB', 'ONTO', 'OPCH', 'ORA', 'ORI', 'OSK', 'OVV', 'OZK', 'PAG', 'PB', 'PBF', 'PCH', 'PCTY', 'PEGA', 'PEN', 'PFGC', 'PII', 'PK', 'PLNT', 'PNFP', 'POR', 'POST', 'POWI', 'PPC', 'PR', 'PRGO', 'PRI', 'PSN', 'PSTG', 'PVH', 'QLYS', 'R', 'RBA', 'RBC', 'REXR', 'RGA', 'RGEN', 'RGLD', 'RH', 'RLI', 'RMBS', 'RNR', 'ROIV', 'RPM', 'RRC', 'RRX', 'RS', 'RYAN', 'RYN', 'SAIA', 'SAIC', 'SAM', 'SATS', 'SBRA', 'SCI', 'SEIC', 'SF', 'SFM', 'SGI', 'SHC', 'SIGI', 'SKX', 'SLAB', 'SLGN', 'SLM', 'SMG', 'SNV', 'SNX', 'SON', 'SR', 'SRPT', 'SSB', 'SSD', 'ST', 'STAG', 'STWD', 'SWX', 'SYNA', 'TCBI', 'TEX', 'THC', 'THG', 'THO', 'TKR', 'TMHC', 'TNL', 'TOL', 'TREX', 'TTC', 'TTEK', 'TXNM', 'TXRH', 'UA', 'UAA', 'UBSI', 'UFPI', 'UGI', 'UMBF', 'UNM', 'USFD', 'UTHR', 'VAC', 'VAL', 'VC', 'VFC', 'VLY', 'VMI', 'VNO', 'VNOM', 'VNT', 'VOYA', 'VVV', 'WAL', 'WBS', 'WCC', 'WEN', 'WEX', 'WFRD', 'WH', 'WHR', 'WING', 'WLK', 'WMG', 'WMS', 'WPC', 'WSO', 'WTFC', 'WTRG', 'WTS', 'WU', 'WWD', 'X', 'XPO', 'XRAY', 'YETI', 'ZI', 'ZION']

type Stock = {
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
  priceChange: number | null;
  currency: string | null;
  longName: string | null;
};
//average daily volume
//n day price change, in $ or by %

function getCompareFunction(stockDifferentiator: keyof Stock) {
  return (stock: Stock, stock2: Stock) => (stock2[stockDifferentiator] as number) - (stock[stockDifferentiator] as number); 
}

export default function Home() {
  const [originalStockList, setOriginalStockList] = useState<Stock[]>([]);
  const [currSortBy, setCurrSortBy] = useState<string>("currentPrice");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStocksData = async () => {
      try {
        setIsLoading(true);
        const responses = await Promise.all(
          myStocks.map(symbol =>
            fetch(`http://localhost:5000/${symbol}`).then(res => res.json())
          )
        );
        setOriginalStockList(responses); // replaces the entire list to prevent duplicates
      } catch (err) {
        console.error("Failed to fetch stock data:", err);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchStocksData(); // initial fetch

    const intervalId = setInterval(fetchStocksData, 15 * 60 * 1000); // every 15 minutes

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);


  const sortedStocks = useMemo(() => {
    const compareFunction = getCompareFunction(currSortBy as keyof Stock);
    return [...originalStockList].sort(compareFunction);
  }, [originalStockList, currSortBy]);

  const stockTableRows = sortedStocks.map(stock => {
    return (
      <tr key={stock.ticker}>
        <th scope="row" className="border border-gray-900 px-4 py-2 text-left">
          <a href={`https://finance.yahoo.com/quote/${stock.ticker}/`} target="_blank" rel="noopener noreferrer">{stock.ticker}</a>
        </th>
        <td scope="row" className="border border-gray-900 px-4 py-2 text-left font-normal">${stock.currentPrice}</td>
        <td scope="row" className="border border-gray-900 px-4 py-2 text-left font-normal">{stock.adapc}%</td>
        <td scope="row" className="border border-gray-900 px-4 py-2 text-left font-normal">{stock.adpc}%</td>
        <td scope="row" className="border border-gray-900 px-4 py-2 text-left font-normal">{stock.averageVolume}</td>
      </tr>      
    );
  });

  return (
    <>
      <h1 className="font-bold pb-3">S&P 400 Stocks</h1>  
      <br></br>
      {isLoading ? (
        <p>Loading stock data...</p>
      ) : (
        <table className="min-w-full border border-gray-900">
          <thead>
            <tr>
              <th scope="col">STOCK</th>
              <th scope="col" onClick={()=>setCurrSortBy("currentPrice")}>Current Price</th>
              <th scope="col" onClick={()=>setCurrSortBy("adapc")}>ADAPC</th>
              <th scope="col" onClick={()=>setCurrSortBy("adpc")}>ADPC</th>
              <th scope="col" onClick={()=>setCurrSortBy("averageVolume")}>ADV</th>
            </tr>
          </thead>
          <tbody>
            {stockTableRows}
          </tbody>
        </table>        
      )}

      <br></br>
      <p>ADAPC: Average daily absolute percent change -- a measure of volatility of a stock</p>
      <p>ADPC: Average daily percent change -- expected daily percent change of a stock, can be positive or negative</p>
      <p>ADV: Average daily volume</p>
    </>
  );
}