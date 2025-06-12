function DaysSelector(props: {handleDaysSelect: (days: string, setter: (num_days: number) => void) => void; setStateFn: (days: number) => void; currDays: number}) {
    return (
        <>
            <label htmlFor="adapc-days-select"></label>
            <select value={props.currDays} name="adapc-days" id="adapc-days-select" onChange={e => props.handleDaysSelect(e.target.value, props.setStateFn)} className="rounded-md border border-gray-500 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">                
                <option value={5}>Past 5 sessions</option>
                <option value={10}>Past 10 sessions</option>
                <option value={50}>Past 50 sessions</option>
                <option value={100}>Past 100 sessions</option>
            </select>
        </>
    )
}

export default DaysSelector