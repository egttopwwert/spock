import "./Field.css";

function Field(props) {
  return (
    <div className={props.className} onClick={props.onClick}>
      {props.text}
    </div>
  );
}

export default Field;
