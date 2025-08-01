import React from "react";

const Input = (props) => {
  return (
    <div>
      <input
        // id={props.id}
        placeholder={props.placeholder}
        ref={props.reference}
        // onChange={(event) => props.handleInput(event)}
      />
    </div>
  );
};

export default Input;
