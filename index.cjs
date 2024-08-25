require('dotenv').config()

const PORT = process.env.VITE_SERVER_PORT
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express();
app.use(cors());

app.get('/news',async (req,res)=>{
    const options = {
        method: 'GET',
        url: 'https://real-time-finance-data.p.rapidapi.com/stock-news',
        params: {
          symbol: 'AAPL:NASDAQ',
          language: 'en'
        },
        headers: {
          'x-rapidapi-key': process.env.VITE_RAPID_API_KEY,
          'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          res.json(response.data.data.news);
      } catch (error) {
          console.error(error);
      }
})

app.get('/currency',(req,res)=>{
    fetch('https://v6.exchangerate-api.com/v6/72611d4b48b6aa8cfc77eb8d/latest/USD').then(response=>{
        return response.json()
    }).then(data=> {
        res.json(data)
    }).catch(err=>{
        console.error(err.message)
    })
})


app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))