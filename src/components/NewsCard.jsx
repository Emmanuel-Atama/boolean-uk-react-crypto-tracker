// This bit creates a link for the
function NewsLink({ url }) {
  return (
    <a href={url} target="_blank">
      {url}
    </a>
  )
}

export default function NewsCard(props) {
  // console.log('Inside News Card: ', props)
  const { description } = props.newsItem
  return (
    <li>
      <article className="newsfeed__card">
        <p>
          {/* You don't need to worry about this bit of code. Just pass the description prop to this component*/}
          {description
            .split(/(https?:\/\/.*\b\/?)/g)
            .map(match =>
              /https?/.test(match) ? <NewsLink url={match} /> : match
            )}
          {/* Ignore the code above */}
        </p>
      </article>
    </li>
  )
}
