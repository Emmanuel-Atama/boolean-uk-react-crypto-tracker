import { useEffect, useState } from 'react'
import NewsCard from './NewsCard'

function NewsFeed(props) {
  const { selectedCripto } = props

  const [newsFeed, setNewsFeed] = useState([])

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
  return (
    <ul className="newsfeed">
      {newsFeed.length > 1
        ? newsFeed.map((news, index) => {
            return <NewsCard key={index} newsItem={news} />
          })
        : 'No news here!'}
    </ul>
  )
}
export default NewsFeed
