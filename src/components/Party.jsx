import React from "react";
import Input from "./input";

const Party = () => {
  const addParty = (event) => {};

  return (
    <div>
      <h1>Manage Party</h1>
      <div className="row">
        <Input handleInput={addParty} />
      </div>
    </div>
  );
};

export default Party;
