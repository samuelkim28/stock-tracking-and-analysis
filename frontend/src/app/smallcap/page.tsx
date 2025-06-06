"use client";
import { useEffect, useMemo, useState } from "react";

const myStocks = ['AAP', 'AAT', 'ABCB', 'ABG', 'ABM', 'ABR', 'ACA', 'ACAD', 'ACIW', 'ACLS', 'ACT', 'ADEA', 'ADMA', 'ADNT', 'ADUS', 'AEIS', 'AEO', 'AESI', 'AGO', 'AGYS', 'AHCO', 'AHH', 'AIN', 'AIR', 'AKR', 'AL', 'ALEX', 'ALG', 'ALGT', 'ALKS', 'ALRM', 'AMN', 'AMPH', 'AMR', 'AMSF', 'AMTM', 'AMWD', 'ANDE', 'ANGI', 'ANIP', 'AORT', 'AOSL', 'APAM', 'APLE', 'APOG', 'ARCB', 'ARI', 'ARLO', 'AROC', 'ARR', 'ARWR', 'ASIX', 'ASO', 'ASTE', 'ASTH', 'ATEN', 'ATGE', 'AUB', 'AVA', 'AVAV', 'AVNS', 'AWI', 'AWR', 'AX', 'AXL', 'AZTA', 'AZZ', 'BANC', 'BANF', 'BANR', 'BCC', 'BCPC', 'BDN', 'BFH', 'BFS', 'BGC', 'BGS', 'BHE', 'BHLB', 'BJRI', 'BKE', 'BKU', 'BL', 'BLFS', 'BLMN', 'BMI', 'BOH', 'BOOT', 'BOX', 'BRC', 'BRKL', 'BSIG', 'BTU', 'BWA', 'BXMT', 'CABO', 'CAKE', 'CAL', 'CALM', 'CALX', 'CARG', 'CARS', 'CASH', 'CATY', 'CBRL', 'CBU', 'CC', 'CCOI', 'CCS', 'CE', 'CENT', 'CENTA', 'CENX', 'CERT', 'CEVA', 'CFFN', 'CHCO', 'CHEF', 'CLB', 'CLSK', 'CNK', 'CNMD', 'CNR', 'CNS', 'CNXN', 'COHU', 'COLL', 'CON', 'COOP', 'CORT', 'CPF', 'CPK', 'CPRX', 'CRC', 'CRGY', 'CRI', 'CRK', 'CRSR', 'CRVL', 'CSGS', 'CSR', 'CSWI', 'CTKB', 'CTRE', 'CTS', 'CUBI', 'CURB', 'CVBF', 'CVCO', 'CVI', 'CWEN', 'CWEN-A', 'CWK', 'CWT', 'CXM', 'CXW', 'DAN', 'DCOM', 'DEA', 'DEI', 'DFH', 'DFIN', 'DGII', 'DIOD', 'DLX', 'DNOW', 'DOCN', 'DORM', 'DRH', 'DRQ', 'DV', 'DVAX', 'DXC', 'DXPE', 'DY', 'EAT', 'ECG', 'ECPG', 'EFC', 'EGBN', 'EIG', 'ELME', 'EMBC', 'ENOV', 'ENR', 'ENVA', 'EPAC', 'EPC', 'EPRT', 'ESE', 'ESI', 'ETD', 'ETSY', 'EVTC', 'EXPI', 'EXTR', 'EYE', 'EZPW', 'FBK', 'FBNC', 'FBP', 'FBRT', 'FCF', 'FCPT', 'FDP', 'FELE', 'FFBC', 'FHB', 'FIZZ', 'FL', 'FMC', 'FORM', 'FOXF', 'FRPT', 'FSS', 'FTDR', 'FTRE', 'FUL', 'FULT', 'FUN', 'FWRD', 'GBX', 'GDEN', 'GDYN', 'GEO', 'GES', 'GFF', 'GIII', 'GKOS', 'GMS', 'GNL', 'GNW', 'GO', 'GOGO', 'GOLF', 'GPI', 'GRBK', 'GSHD', 'GTES', 'GTY', 'GVA', 'HAFC', 'HASI', 'HAYW', 'HBI', 'HCC', 'HCI', 'HCSG', 'HELE', 'HFWA', 'HI', 'HIW', 'HLIT', 'HLX', 'HMN', 'HNI', 'HOPE', 'HP', 'HRMY', 'HSII', 'HSTM', 'HTH', 'HTLD', 'HTZ', 'HUBG', 'HWKN', 'HZO', 'IAC', 'IART', 'IBP', 'ICHR', 'ICUI', 'IDCC', 'IIIN', 'IIPR', 'INDB', 'INN', 'INSP', 'INSW', 'INVA', 'IOSP', 'IPAR', 'ITGR', 'ITRI', 'JACK', 'JBGS', 'JBLU', 'JBSS', 'JBT', 'JJSF', 'JOE', 'JXN', 'KAI', 'KALU', 'KAR', 'KFY', 'KLG', 'KLIC', 'KMT', 'KN', 'KOP', 'KREF', 'KRYS', 'KSS', 'KTB', 'KTOS', 'KW', 'KWR', 'LBRT', 'LCII', 'LEG', 'LGIH', 'LGND', 'LKFN', 'LMAT', 'LNC', 'LNN', 'LPG', 'LQDT', 'LRN', 'LTC', 'LUMN', 'LXP', 'LZB', 'MAC', 'MARA', 'MATW', 'MATX', 'MBC', 'MC', 'MCRI', 'MCW', 'MCY', 'MD', 'MDU', 'MGEE', 'MGPI', 'MGY', 'MHO', 'MLAB', 'MLKN', 'MMI', 'MMSI', 'MNRO', 'MODG', 'MOG-A', 'MP', 'MPW', 'MRCY', 'MRP', 'MRTN', 'MSEX', 'MSGS', 'MTH', 'MTRN', 'MTUS', 'MTX', 'MWA', 'MXL', 'MYGN', 'MYRG', 'NABL', 'NATL', 'NAVI', 'NBHC', 'NBTB', 'NEO', 'NEOG', 'NGVT', 'NHC', 'NMIH', 'NOG', 'NPK', 'NPO', 'NSIT', 'NTCT', 'NVEE', 'NVRI', 'NWBI', 'NWL', 'NWN', 'NX', 'NXRT', 'NYMT', 'OFG', 'OGN', 'OI', 'OII', 'OMCL', 'OMI', 'OSIS', 'OTTR', 'OUT', 'OXM', 'PAHC', 'PARR', 'PATK', 'PAYO', 'PBH', 'PBI', 'PCRX', 'PDFS', 'PEB', 'PECO', 'PENN', 'PFBC', 'PFS', 'PGNY', 'PHIN', 'PI', 'PINC', 'PIPR', 'PJT', 'PLAB', 'PLAY', 'PLMR', 'PLUS', 'PLXS', 'PMT', 'POWL', 'PPBI', 'PRA', 'PRAA', 'PRDO', 'PRG', 'PRGS', 'PRK', 'PRLB', 'PRVA', 'PSMT', 'PTEN', 'PTGX', 'PUMP', 'PZZA', 'QDEL', 'QNST', 'QRVO', 'RAMP', 'RC', 'RCUS', 'RDN', 'RDNT', 'RES', 'REX', 'REZI', 'RGR', 'RHI', 'RHP', 'RNST', 'ROCK', 'ROG', 'RUN', 'RUSHA', 'RWT', 'RXO', 'SABR', 'SAFE', 'SAFT', 'SAH', 'SANM', 'SBCF', 'SBH', 'SBSI', 'SCHL', 'SCL', 'SCSC', 'SCVL', 'SDGR', 'SEDG', 'SEE', 'SEM', 'SFBS', 'SFNC', 'SGH', 'SHAK', 'SHEN', 'SHO', 'SHOO', 'SIG', 'SITC', 'SITM', 'SJW', 'SKT', 'SKY', 'SKYW', 'SLG', 'SLP', 'SLVM', 'SM', 'SMP', 'SMPL', 'SMTC', 'SNCY', 'SNDK', 'SNDR', 'SNEX', 'SONO', 'SPNT', 'SPSC', 'SPTN', 'SPXC', 'SSTK', 'STAA', 'STBA', 'STC', 'STEL', 'STEP', 'STRA', 'STRL', 'SUPN', 'SXC', 'SXI', 'SXT', 'TALO', 'TBBK', 'TDC', 'TDS', 'TDW', 'TFIN', 'TFX', 'TGI', 'TGNA', 'TGTX', 'THRM', 'THRY', 'THS', 'TILE', 'TMDX', 'TMP', 'TNC', 'TNDM', 'TPH', 'TR', 'TRIP', 'TRMK', 'TRN', 'TRNO', 'TRST', 'TRUP', 'TTGT', 'TTMI', 'TWI', 'TWO', 'UCBI', 'UCTT', 'UE', 'UFCS', 'UFPT', 'UHT', 'UNF', 'UNFI', 'UNIT', 'UPBD', 'URBN', 'USNA', 'USPH', 'UTL', 'UVV', 'VBTX', 'VCEL', 'VECO', 'VIAV', 'VICR', 'VIR', 'VIRT', 'VRE', 'VRRM', 'VRTS', 'VSAT', 'VSCO', 'VSH', 'VSTS', 'VTLE', 'VTOL', 'VVI', 'VYX', 'WABC', 'WAFD', 'WD', 'WDFC', 'WERN', 'WGO', 'WHD', 'WKC', 'WLY', 'WOLF', 'WOR', 'WRLD', 'WS', 'WSC', 'WSFS', 'WSR', 'WT', 'WWW', 'XHR', 'XNCR', 'XPEL', 'XRX', 'YELP', 'YOU', 'ZD', 'ZWS']

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