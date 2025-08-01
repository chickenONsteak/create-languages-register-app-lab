import React from "react";

const PartyUpdate = (props) => {
  const nameRef = useRef();
  const ageRef = useRef();
  const countryRef = useRef();
  const languageRef = useRef();

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
          <div className="col-md-3">Moveset: </div>
          <input
            type="text"
            ref={languageRef}
            className="col-md-3"
            defaultValue={props.moveset}
          />
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-md-3"></div>
          <button onClick={mutate} className="col-md-3">
            update
          </button>
          <button
            onClick={() => props.setShowUpdateModal(false)}
            className="col-md-3"
          >
            cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          title={props.title}
          author={props.author}
          yearPublished={props.yearPublished}
          getData={props.getData}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default PartyUpdate;
