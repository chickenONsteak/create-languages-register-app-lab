import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";

const PartyMoveset = () => {
  const queryClient = useQueryClient();
  const languageRef = useRef();
  const [selectedMember, setSelectedMember] = useState("");

  const getUserData = async () => {
    const userRes = await fetch(import.meta.env.VITE_SERVER + "/lab/users");
    if (!userRes.ok) {
      throw new Error("error retrieving users");
    }
    return await userRes.json();
  };

  // GET THE LIST OF LANGUAGES THAT THE USER KNOWS
  const getUserLanguageData = async (id) => {
    const userLanguagesRes = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: id,
        }),
      }
    );
    if (!userLanguagesRes.ok) {
      throw new Error("error retrieving languages that the user knows");
    }
    return await userLanguagesRes.json();
  };

  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUserData,
  });

  const userLanguageQuery = useQuery({
    queryKey: ["userLanguages", selectedMember], // so that the listed languages changes responsively to what user is selected
    queryFn: () => getUserLanguageData(selectedMember),
    enabled: !!selectedMember && selectedMember !== "select", // so that POST won't run automatically while no specific user is selected in the dropdown box AND when user press "Select member" option, it doesn't continue too
  });

  // ADD A LANGUAGE THAT THE USER KNOW
  const addLanguage = async (id) => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: id,
          language: languageRef.current.value,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("error adding language");
    }
  };

  const mutationAdd = useMutation({
    mutationFn: (id) => addLanguage(id),
    onSuccess: () => {
      languageRef.current.value = "";
      queryClient.invalidateQueries(["userLanguages"]);
    },
  });

  // DELETE LANGUAGE
  const deleteLanguage = async (language) => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: selectedMember,
          language: language,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("error deleting language");
    }
  };

  const mutationDelete = useMutation({
    mutationFn: (language) => deleteLanguage(language),
    onSuccess: () => queryClient.invalidateQueries(["userLanguages"]),
  });

  return (
    <div className="container">
      <div className="row">
        <label htmlFor="partyMembers">Select a party member</label>
        <select
          name="partyMembers"
          className="col-md-3"
          onChange={(event) => setSelectedMember(event.target.value)}
        >
          <option value="select">Select member</option>
          {userQuery.isSuccess &&
            userQuery.data.map((partyMember) => {
              return (
                <option
                  value={partyMember.id}
                  key={partyMember.id}
                  onClick={(event) => getUserLanguageData(event.target.value)}
                >
                  {partyMember.name}
                </option>
              );
            })}
        </select>
        <input type="text" ref={languageRef} className="col-md-3" />
        <button
          className="col-md-2"
          onClick={() => {
            mutationAdd.mutate(selectedMember);
          }}
        >
          Add
        </button>
      </div>
      <br />

      {userLanguageQuery.isSuccess &&
        userLanguageQuery.data.map((langauge, idx) => (
          <div className="row" key={idx}>
            <div>{langauge}</div>
            <button onClick={() => mutationDelete.mutate(langauge)}>
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default PartyMoveset;
