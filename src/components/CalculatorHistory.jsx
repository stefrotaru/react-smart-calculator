/* eslint-disable react/prop-types */

function CalculatorHistory(props) {
    console.log(props.result)
    let showHistory = props.previousEntries[0]

    return (
        <>
            {showHistory && <div className="history">
                <span className="history_title">Previous entries</span>
                {props.previousEntries.map((entry, i) => <p key={i} className="history_entry">{entry.calc} = {entry.result}</p>)}
            </div>}
            
        </>
    )
}

export default CalculatorHistory