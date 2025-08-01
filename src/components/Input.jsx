import React from "react";

const Input = (props) => {
  return (
    <div>
      <input
        id={props.id}
        placeholder="Enter here"
        onChange={(event) => props.handleInput(event)}
      />
    </div>
  );
};

export default Input;
