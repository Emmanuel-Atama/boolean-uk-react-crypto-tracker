import SideListItem from './SideListItem'
function SideList(props) {
  return (
    <aside className="side-list">
      <ul>
        {props.coins.map(coin => {
          return (
            <SideListItem
              item={coin}
              isSelectedCripto={props.isSelectedCripto}
              selectCripto={props.setSelectedCripto}
            />
          )
        })}
      </ul>
    </aside>
  )
}
export default SideList
