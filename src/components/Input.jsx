import React from "react";

const Input = (props) => {
  return (
    <div>
      <input placeholder={props.placeholder} ref={props.reference} />
    </div>
  );
};

export default Input;
