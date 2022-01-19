import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from "axios"
import Coin from './Coin';

const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"

function App() {
  const [coins, setCoins]=useState([])
  const [search, setSearch]=useState("")

  
  useEffect(()=>{
    Axios.get(API_URL).then(res =>{
      setCoins(res.data)
    }).catch(error => console.log(error))
  },[])
  
  const handleChange = (e)=>{
    setSearch(e.target.value)
  }
  const filterCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) 
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-title">Buscar una divisa</h1>
        <form>
          <input type="text" 
                className="coin-input" 
                placeholder='Buscar'
                onChange={handleChange}/>
        </form>
      </div>
      {filterCoins.map((coin)=>{
        return (
          <Coin key={coin.id} 
                name={coin.name} 
                image={coin.image} 
                symbol={coin.symbol} 
                price={coin.current_price} 
                marketcap={coin.market_cap} 
                priceChange={coin.price_change_percentage_24h}
                volume={coin.total_volume}
          />
        )
      })}
    </div>
  );
}

export default App;
