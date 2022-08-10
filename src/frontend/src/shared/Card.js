import "./Card.css";

const Card = (props) => {
  return (
    <div className={`card ${props.className}`}>
      {props.header !== undefined && props.header !== "" && (
        <div className="card-header">
          <h3>{props.header}</h3>
        </div>
      )}
      <div className="card-body">{props.children}</div>
    </div>
  );
};

export default Card;
