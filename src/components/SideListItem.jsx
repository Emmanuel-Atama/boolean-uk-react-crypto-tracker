export default function SideListItem({ isSelectedCripto, selectCripto, item }) {
  const { id, name } = item

  // const id = item.id
  // const name = item.name
  return (
    <li>
      <button
        className={isSelectedCripto(id) ? 'selected' : ''}
        onClick={() => selectCripto(id)}
      >
        {name}
      </button>
    </li>
  )
}
