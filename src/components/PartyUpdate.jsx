import React, { useRef, useState } from "react";
import styles from "./Modal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactDOM from "react-dom";

const OverLay = (props) => {
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();
  const queryClient = useQueryClient();

  // UPDATE PARTY MEMBER INFO
  const updatePartyInfo = async (id) => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: id,
        name: nameRef.current.value,
        age: ageRef.current.value,
        country: countryRef.current.value,
      }),
    });
    if (!res.ok) {
      throw new Error("error updating party member");
    }
  };

  const mutation = useMutation({
    mutationFn: (id) => updatePartyInfo(id),
    onSuccess: () => {
      queryClient.invalidateQueries([props.query]);
      props.setShowUpdateModal(false);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <br />
        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Name: </div>
          <input
            type="text"
            ref={nameRef}
            className="col-md-3"
            defaultValue={props.name}
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Age: </div>
          <input
            type="text"
            ref={ageRef}
            className="col-md-3"
            defaultValue={props.age}
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-3">Country: </div>
          <input
            type="text"
            ref={countryRef}
            className="col-md-3"
            defaultValue={props.country}
          />
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <button
            onClick={() => mutation.mutate(props.id)}
            className="col-md-3"
          >
            Update
          </button>
          <button
            onClick={() => props.setShowUpdateModal(false)}
            className="col-md-3"
          >
            Cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const PartyUpdate = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          name={props.name}
          age={props.age}
          country={props.country}
          setShowUpdateModal={props.setShowUpdateModal}
          query={props.query}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default PartyUpdate;
