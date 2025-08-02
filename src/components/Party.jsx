import React, { useRef, useState } from "react";
import Input from "./input";
import Button from "./Button";
import PartyUpdate from "./PartyUpdate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Party = () => {
  const queryClient = useQueryClient();
  const partyNameRef = useRef();
  const partyAgeRef = useRef();
  const partyCountryRef = useRef();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // FETCH USERS DATA
  const getData = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users");
    if (!res.ok) {
      throw new Error("error retrieving users");
    }
    return await res.json();
  };

  const query = useQuery({ queryKey: ["party"], queryFn: getData });

  // ADD PARTY MEMBER
  const addParty = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: partyNameRef.current.value,
        age: partyAgeRef.current.value,
        country: partyCountryRef.current.value,
      }),
    });
    if (!res.ok) {
      throw new Error("error adding party member");
    }
  };

  const mutationAddParty = useMutation({
    mutationFn: addParty,
    onSuccess: () => {
      partyNameRef.current.value = "";
      partyAgeRef.current.value = "";
      partyCountryRef.current.value = "";
      queryClient.invalidateQueries(["party"]);
    },
  });

  // DELETE PARTY MEMBER
  const deleteParty = async (id) => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: id }),
    });
    if (!res.ok) {
      throw new Error("error deleting party member");
    }
  };

  const mutationDeleteParty = useMutation({
    mutationFn: (id) => deleteParty(id),
    onSuccess: () => queryClient.invalidateQueries(["party"]),
  });

  return (
    <div>
      <h1>Manage Party</h1>
      <div className="row">
        <Input reference={partyNameRef} placeholder="Enter name" />
        <Input reference={partyAgeRef} placeholder="Enter age" />
        <Input reference={partyCountryRef} placeholder="Enter country" />
        <Button mutate={mutationAddParty.mutate}>Add</Button>
      </div>

      <br />

      <div className="row">
        <div className="col-md-2">Name</div>
        <div className="col-md-2">Age</div>
        <div className="col-md-2">Country</div>
        <div className="col-md-2"></div>
        <div className="col-md-2"></div>
      </div>
      {query.isSuccess &&
        query.data.map((member) => {
          return (
            <div className="row" key={member.id}>
              <div className="col-md-2">{member.name}</div>
              <div className="col-md-2">{member.age}</div>
              <div className="col-md-2">{member.country}</div>
              <button
                className="col-md-2"
                onClick={() => setShowUpdateModal(true)}
              >
                Update
              </button>
              {showUpdateModal && (
                <PartyUpdate
                  className="col-md-2"
                  id={member.id}
                  name={member.name}
                  age={member.age}
                  country={member.country}
                  setShowUpdateModal={setShowUpdateModal}
                  query={query}
                />
              )}
              <Button
                mutate={() => mutationDeleteParty.mutate(member.id)}
                className="col-md-2"
              >
                Delete
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default Party;
