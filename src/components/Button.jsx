import React from "react";

const Button = (props) => {
  return props.id ? (
    <button onClick={() => props.mutate(props.id)}>{props.children}</button>
  ) : (
    <button onClick={props.mutate}>{props.children}</button>
  );
};

export default Button;
