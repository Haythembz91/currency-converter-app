
const ExchangeRate = ({exchangeRate,currencyExchange,updateTime})=>{
    return (
        <div className={'exchange-rate'}>
            <h3>Exchange Rate:</h3>
            <h1>{exchangeRate}</h1>
            <p>{currencyExchange}</p>
            <p style={{fontSize:'12px',textAlign:'right'}}><i>{updateTime}</i></p>
        </div>
    )
}

export default ExchangeRate