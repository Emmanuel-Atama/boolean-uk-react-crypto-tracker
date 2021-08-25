import { useEffect, useState } from 'react'

import MainDetail from './components/MainDetail'
import { CRIPTO_LIST, STATUS_UPDATES } from './constants'
import SideListItem from './components/SideListItem'
// import NewsCard from './components/NewsCard'

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null)
  const [coins, setCoins] = useState([])
  // const [news, setNews] = useState([])

  console.log('Inside state: ', coins)
  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
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

  // useEffect(() => {
  //   fetch(STATUS_UPDATES)
  //     .then(response => response.json())
  //     .then(result => {
  //       setNews(result)
  //     })
  //   // console.log('Inside setnews fetch: ')
  // }, [])
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
        <ul className="newsfeed">
          {selectedCripto ? (
            <MainDetail
              coin={mainDetailCoin}
              name={coins.name}
              symbol={coins.symbol}
            />
          ) : (
            'select a coin bro!'
          )}
          {/* <NewsCard description={description} /> */}
        </ul>
      </main>
    </>
  )
}

export default App
