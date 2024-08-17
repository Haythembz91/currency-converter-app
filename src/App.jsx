import React from 'react'
import NewsFeed from './components/NewsFeed.jsx'
import CurrencyConverter from "./components/CurrencyConverter.jsx"

const App = ()=>{
    return (
        <>
            <h1 style={{textAlign:'center'}}>Currency Dashboard</h1>
            <div className={'app'}>
                <CurrencyConverter/>
                <NewsFeed/>
            </div>
        </>

    )

}

export default App
