
import React, {useEffect, useRef, useState} from 'react'
import ExchangeRate from "./ExchangeRate.jsx"


const CurrencyConverter = ()=>{

    const [primaryCurrency,setPrimaryCurrency]=useState('EUR')
    const [secondaryCurrency,setSecondaryCurrency]=useState('TND')
    const [amount,setAmount]=useState(1)
    const [currencyList,setCurrencyList]=useState([])
    const [exchangeList,setExchangeList]=useState([])
    const [convertedAmount,setConvertedAmount]=useState('')
    const exchangeRef = useRef('')
    const [updateTime,setUpdateTime]=useState('')
    const currencyExchangeRef = useRef('')

useEffect(()=>{
    fetch('http://localhost:8000/currency').then(response=>{
        return response.json()
    }).then(data=> {
        setCurrencyList(Object.keys(data['conversion_rates']))
        setExchangeList(Object.values(data['conversion_rates']))
        setUpdateTime(data['time_last_update_utc'].slice(0,16))
        console.log('fetched')

    }).catch(err=>{
        console.error(err.message)
    })
},[])


    console.log('rendered')

    const convert = ()=>{
        exchangeRef.current=(exchangeList[currencyList.indexOf(secondaryCurrency)]/exchangeList[currencyList.indexOf(primaryCurrency)]).toFixed(6)
        setConvertedAmount((amount*exchangeRef.current).toFixed(6))
        currencyExchangeRef.current=`${primaryCurrency} to ${secondaryCurrency}`
    }

    const swap=()=>{
        const  temp=primaryCurrency;
        setPrimaryCurrency(secondaryCurrency);
        setSecondaryCurrency(temp);
    }


    return (
        <div className={'currency-converter'}>
            <h2>Currency Converter</h2>
            <div className={'input-box'}>
                <div>
                    <div>
                        <label htmlFor={'currency-amount1'} >Primary currency</label>
                            <input type={"number"} name={'currency-amount1'} value={amount} id={'currency-amount1'} onChange={(e)=>{
                                setAmount(Number(e.target.value))
                            }}/>
                            <select value={primaryCurrency} className={'currency-options1'} name={'currency-options1'} onChange={(e)=>
                                setPrimaryCurrency(e.target.value)}>
                                {currencyList.map((currency,index)=><option key={index}>{currency}</option>)}
                            </select>
                    </div>
                    <button onClick={()=>swap()}>⇅</button>
                    <div>
                        <label htmlFor={'currency-amount2'}>Secondary currency</label>

                            <input type={"number"} name={'currency-amount2'} id={'currency-amount2'} value={convertedAmount} disabled={true}/>
                            <select value={secondaryCurrency} className={'currency-options2'} name={'currency-options2'} onChange={(e)=>{
                                setSecondaryCurrency(e.target.value)
                            }}>
                                {currencyList.map((currency,index)=><option key={index}>{currency}</option>)}
                            </select>
                    </div>
                </div>
            </div>
            <button id={'convert-button'} onClick={()=>convert()}>Convert</button>
            <ExchangeRate exchangeRate={exchangeRef.current}
            currencyExchange={currencyExchangeRef.current} updateTime={updateTime}></ExchangeRate>
        </div>
    )
}

export default CurrencyConverter