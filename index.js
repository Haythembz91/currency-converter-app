const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

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
          'x-rapidapi-key': '51d5f0bb02msh91469cad28e9548p165676jsn02584139e60d',
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