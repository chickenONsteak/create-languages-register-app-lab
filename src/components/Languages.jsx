import React, { useRef } from "react";
import Input from "./input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";

const Languages = () => {
  const queryClient = useQueryClient();
  const languageRef = useRef();

  // FETCH LANGUAGES DATA
  const getLanguages = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");

    if (!res.ok) {
      throw new Error("error getting languages");
    }

    return await res.json();
  };
  const query = useQuery({ queryKey: ["languages"], queryFn: getLanguages });

  // ADD LANGUAGE
  const addLanguage = async () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month}-${day}`;

    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    const currentTime = `${hour}:${minute}:${seconds}`;

    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: languageRef.current.value,
        created_at: `${currentDate} ${currentTime}`,
      }),
    });

    if (!res.ok) {
      throw new Error("error adding language");
    }
  };

  const mutationAddLanguage = useMutation({
    mutationFn: addLanguage,
    onSuccess: () => {
      languageRef.current.value = "";
      queryClient.invalidateQueries(["languages"]);
    },
  });

  // DELETE LANGUAGE
  const deleteLanguage = async (id) => {
    // encode id to delete languages with "#"
    const encodedId = encodeURIComponent(id);
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/languages/" + encodedId,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("error deleting language");
    }
  };

  const mutationDelLanguage = useMutation({
    mutationFn: deleteLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries(["languages"]);
    },
  });

  return (
    <div className="container">
      <h1>Manage Languages</h1>
      <div className="row">
        <Input reference={languageRef} placeholder="Enter language" />
        <Button mutate={mutationAddLanguage.mutate}>Add</Button>
      </div>

      <br />

      <div className="row">
        <div className="col-md-3">Language</div>
        <div className="col-md-3">Create at</div>
      </div>
      {query.isSuccess &&
        query.data.map((language) => (
          <div className="row" key={language.language + language.created_at}>
            <div className="col-md-3">{language.language}</div>
            <div className="col-md-3">{language.created_at}</div>
            <Button mutate={mutationDelLanguage.mutate} id={language.language}>
              Delete
            </Button>
          </div>
        ))}
    </div>
  );
};

export default Languages;
