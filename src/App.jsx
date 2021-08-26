import { useEffect, useState } from 'react'

import MainDetail from './components/MainDetail'
import { CRIPTO_LIST } from './constants'
import SideListItem from './components/SideListItem'
import NewsCard from './components/NewsCard'

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null)
  const [coins, setCoins] = useState([])
  const [newsFeed, setNewsFeed] = useState([])

  console.log('Inside state Coins: ', coins)

  console.log('Inside state NewsFeed: ', newsFeed)

  function isSelectedCripto(id) {
    return selectedCripto === id
  }

  useEffect(() => {
    fetch(CRIPTO_LIST)
      .then(response => response.json())
      .then(result => {
        setCoins(result)
      })
    // console.log('Inside setCoin fetch: ')
  }, [])

  useEffect(() => {
    if (selectedCripto) {
      fetch(
        `https://api.coingecko.com/api/v3/coins/${selectedCripto}/status_updates`
      )
        .then(res => res.json())
        .then(newsFeed => {
          console.log('Inside Fetch to statusupdate: ', newsFeed.status_updates)

          setNewsFeed(newsFeed.status_updates)
        })
    }
  }, [selectedCripto])
  function findCoin(targetId) {
    return coins.find(coin => coin.id === targetId)
  }
  const mainDetailCoin = findCoin(selectedCripto)
  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        <ul>
          {coins.map(coin => {
            return (
              <SideListItem
                item={coin}
                isSelectedCripto={isSelectedCripto}
                selectCripto={setSelectedCripto}
              />
            )
          })}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCripto ? (
          <MainDetail
            coin={mainDetailCoin}
            name={coins.name}
            symbol={coins.symbol}
            current_price={coins.current_price}
            last_updated={coins.last_updated}
          />
        ) : (
          'select a coin bro!'
        )}
        <ul className="newsfeed">
          {/* description={description} */}
          <NewsCard />
        </ul>
      </main>
    </>
  )
}

export default App
