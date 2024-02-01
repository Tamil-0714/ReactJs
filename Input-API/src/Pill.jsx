
const Pill = ({image,name, onClick}) => {
  return (
    <span className="user-pill" onClick={onClick}>
        <img src={image} alt={name} />
        <span>{name} &times;</span>
    </span>
  )
}

export default Pill
