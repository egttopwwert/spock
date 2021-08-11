import "./Counter.css";

function Counter(props) {
  return (
    <div className="counter">
      <p>
        {props.icon} {props.value}
      </p>
      <p>{props.description}</p>
    </div>
  );
}

export default Counter;