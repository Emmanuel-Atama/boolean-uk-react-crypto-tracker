// This bit creates a link for the
function NewsLink({ url }) {
  return (
    <a href={url} target="blank">
      {url}
    </a>
  )
}

export default function NewsCard({ newsItem }) {
  const { description } = newsItem
  return (
    <ul className="newsfeed">
      <li>
        <article className="newsfeed__card">
          <p>
            <a href="" target="_blank"></a>
          </p>
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
    </ul>
  )
}
