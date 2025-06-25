import { Stock } from "@/types/stock";

function StockTable(props: {
  sortedStocks: Stock[];
  setCurrSortBy: (prevSortBy: string) => void;
  handleRemove?: (stockToRemove: string) => void;
  adapcDaysSelector: React.ReactElement;
  adpcDaysSelector: React.ReactElement;
  advDaysSelector: React.ReactElement;
}) {
  const stockTableRows = props.sortedStocks.map((stock: Stock) => (
    <tr key={stock.ticker} className="hover:bg-gray-50">
      <th scope="row" className="border border-gray-300 px-4 py-2 text-left font-medium text-blue-700">
        <a
          href={`https://finance.yahoo.com/quote/${stock.ticker}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {stock.ticker}
        </a>
      </th>
      <td className="border border-gray-300 px-4 py-2 text-left">${stock.currentPrice?.toFixed(2)}</td>
      <td className="border border-gray-300 px-4 py-2 text-left">{stock.adapc}%</td>
      <td className="border border-gray-300 px-4 py-2 text-left">{stock.adpc}%</td>
      <td className="border border-gray-300 px-4 py-2 text-left">{stock.averageVolume?.toLocaleString()}</td>
      {props.handleRemove && (
        <td className="border border-gray-300 px-4 py-2 text-center">
          <button
            onClick={() => props.handleRemove!(stock.ticker)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            -
          </button>
        </td>
      )}
    </tr>
  ));

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th scope="col" className="px-4 py-2 text-left">Stock</th>
            <th
              scope="col"
              className="px-4 py-2 text-left cursor-pointer hover:text-blue-600 transition"
              onClick={() => props.setCurrSortBy("currentPrice")}
            >
              Current Price
            </th>
            <th scope="col" className="px-4 py-2">
              <div className="flex items-baseline gap-2" >
                <span onClick={() => props.setCurrSortBy("adapc")} className="cursor-pointer hover:text-blue-600 transition">ADAPC</span>
                {props.adapcDaysSelector}
              </div>
            </th>
            <th scope="col" className="px-4 py-2">
              <div className="flex items-baseline gap-2" >
                <span onClick={() => props.setCurrSortBy("adpc")} className="cursor-pointer hover:text-blue-600 transition">ADPC</span>
                {props.adpcDaysSelector}
              </div>
            </th>
            <th scope="col" className="px-4 py-2">
              <div className="flex items-baseline gap-2">
                <span onClick={() => props.setCurrSortBy("averageVolume")} className="cursor-pointer hover:text-blue-600 transition">ADV</span>
                {props.advDaysSelector}
              </div>
            </th>
            {props.handleRemove && <th scope="col" className="px-4 py-2 text-center">Action</th>}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {stockTableRows}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;
