const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express();
//test
app.use(cors());

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))


app.get('/news',(req,res)=>{
    
    const options = {
        method: 'GET',
        url: 'https://seeking-alpha.p.rapidapi.com/news/v2/list',
        params: {
            category: 'market-news::all',
            size: '10',
            number: '1'
        },
        headers: {
            'X-RapidAPI-Key': process.env.VITE_RAPID_API_KEY,
            'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com'
        }
    }
    fetch(options).then(response=>{
        res.json(response.data.data)
    }).catch(err=>{
        console.error(err)
    })
})

app.get('/currency',(req,res)=>{
    fetch(process.env.VITE_API_KEY).then(response=>{
        return response.json()
    }).then(data=> {
        res.json(data)
    }).catch(err=>{
        console.error(err.message)
    })
})
