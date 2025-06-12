import { Stock } from "@/types/stock";

function StockTable(props: { sortedStocks: Stock[]; setCurrSortBy: (prevSortBy: string) => void; handleRemove?: (stockToRemove: string) => void; adapcDaysSelector: React.ReactElement; adpcDaysSelector: React.ReactElement; advDaysSelector: React.ReactElement }) {
  const stockTableRows = props.sortedStocks.map((stock: Stock) => {
    return (
      <tr key={stock.ticker}>
        <th scope="row" className="border border-gray-900 px-4 py-2 text-left">
          <a href={`https://finance.yahoo.com/quote/${stock.ticker}/`} target="_blank" rel="noopener noreferrer">{stock.ticker}</a>
        </th>
        <td scope="row" className="border border-gray-900 px-4 py-2 text-left font-normal">${stock.currentPrice}</td>
        <td scope="row" className="border border-gray-900 px-4 py-2 text-left font-normal">{stock.adapc}%</td>
        <td scope="row" className="border border-gray-900 px-4 py-2 text-left font-normal">{stock.adpc}%</td>
        <td scope="row" className="border border-gray-900 px-4 py-2 text-left font-normal">{stock.averageVolume?.toLocaleString()}</td>
        <td scope="row" className="border border-gray-900 px-4 py-2 text-left font-normal">{stock.peRatio ?? "--"}</td>
        <td scope="row" className="border border-gray-900 px-4 py-2 text-left font-normal">{stock.eps ?? "--"}</td>
        {(props.handleRemove)? <td scope="row" className="">
          <button onClick={() => props.handleRemove!(stock.ticker)} className="px-4 py-1 bg-red-400 text-white rounded">-</button>          
        </td> : null}
      </tr>      
    );
  });

  return (
    <>
      <table className="min-w-full border border-gray-900">
        <thead>
          <tr>
            <th scope="col" className="px-4 py-2">STOCK</th>
            <th scope="col" className="px-4 py-2" onClick={()=>props.setCurrSortBy("currentPrice")}>Current Price</th>
            <th scope="col" className="px-4 py-2"><span onClick={()=>props.setCurrSortBy("adapc")}>ADAPC</span>{props.adapcDaysSelector}</th>
            <th scope="col" className="px-4 py-2"><span onClick={()=>props.setCurrSortBy("adpc")}>ADPC</span>{props.adpcDaysSelector}</th>
            <th scope="col" className="px-4 py-2"><span onClick={()=>props.setCurrSortBy("averageVolume")}>ADV</span>{props.advDaysSelector}</th>
            <th scope="col" className="px-4 py-2" onClick={()=>props.setCurrSortBy("peRatio")}>PE Ratio (TTM)</th>
            <th scope="col" className="px-4 py-2" onClick={()=>props.setCurrSortBy("eps")}>EPS (TTM)</th>
          </tr>
        </thead>
        <tbody>
          {stockTableRows}
        </tbody>
      </table>
    </>
  )
}

export default StockTable