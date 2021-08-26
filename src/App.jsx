import { useEffect, useState } from 'react'

import MainDetail from './components/MainDetail'
import { CRIPTO_LIST } from './constants'
import SideListItem from './components/SideListItem'
import NewsFeed from './components/NewsFeed'
import SideList from './components/SideList'

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

  function findCoin(targetId) {
    return coins.find(coin => coin.id === targetId)
  }
  const mainDetailCoin = findCoin(selectedCripto)
  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <SideList
        coins={coins}
        item={coins}
        isSelectedCripto={isSelectedCripto}
        selectCripto={setSelectedCripto}
      />
      {/* <aside className="side-list">
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
      </aside> */}
      <main className="main-detail">
        {selectedCripto ? (
          <MainDetail coin={mainDetailCoin} />
        ) : (
          'select a coin bro!'
        )}
        <NewsFeed selectedCripto={selectedCripto} />
      </main>
    </>
  )
}

export default App
