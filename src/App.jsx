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
    console.log('Inside setCoin fetch: ')
  }, [])

  useEffect(() => {
    if (selectedCripto) {
      const url = `https://api.coingecko.com/api/v3/coins/${selectedCripto}/status_updates`

      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log('Inside Fetch to STATUS_UPDATES: ', data)
          const statusUpdates = data['status_updates']
          setNewsFeed(statusUpdates)
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
          <MainDetail coin={mainDetailCoin} />
        ) : (
          'select a coin bro!'
        )}
        {
          <ul className="newsfeed">
            {newsFeed.length > 1
              ? newsFeed.map((news, index) => {
                  return <NewsCard key={index} newsItem={news} />
                })
              : 'No news here!'}
          </ul>
        }
      </main>
    </>
  )
}

export default App
