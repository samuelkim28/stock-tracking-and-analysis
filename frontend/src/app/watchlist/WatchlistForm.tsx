function WatchlistForm(props: {input: string; setInput: (input: string) => void; handleClear: () => void; handleSubmit: (e: {preventDefault: () => void}) => void}) {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          value={props.input}
          onChange={(e) => props.setInput(e.target.value)}
          placeholder="Enter text"
          className="border px-2"
        />
        <button type="submit" className="border border-blue-900 bg-gray-100 rounded ml-8 mr-16 px-4 py-2">Submit</button>
        <button onClick={props.handleClear} className="px-2 py-1 bg-red-500 text-white rounded">
          Clear Watchlist
        </button>        
      </form>    
    </>
  )
}

export default WatchlistForm