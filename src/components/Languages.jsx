import React, { useRef } from "react";
import Input from "./input";
import Display from "./Display";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Languages = () => {
  const queryClient = useQueryClient();

  // fetch data and put in languagesRef
  const getLanguages = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");

    if (!res.ok) {
      throw new Error("error getting languages");
    }

    return await res.json();
  };
  const query = useQuery({ queryKey: ["languages"], queryFn: getLanguages });

  const addLanguage = (event) => {
    // languagesRef.current
  };

  return (
    <div className="container">
      <h1>Manage Languages</h1>
      <div>{JSON.stringify(query.data)}</div>
      {/* <Input handleInput={addLanguage} id="language" />
      <Display listOfLanguages={languagesRef} /> */}
    </div>
  );
};

export default Languages;
