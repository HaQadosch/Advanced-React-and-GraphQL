import SingleItem from '../components/SingleItem'

export const Item = props => (
  <div>
    <SingleItem id={props.query.id} />
  </div>
)

export default Item
