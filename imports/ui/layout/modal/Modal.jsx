import React, { Fragment } from "react";
import "./Modal.css";

import Overlay from "./../overlay/Overlay.jsx";

export default function Modal({ show, closeModal , content}) {
  const template = (
    <Fragment>
      <Overlay show={show} overlayClicked={() => closeModal(false)} />
      <div className="modal">
        <header>Confirmation alert</header>
        <section>{content}?</section>
        <footer>
          <button className="cancel" onClick={() => closeModal(false)}>
            No
          </button>
          <button className="confirm" onClick={() => closeModal(true)}>
            Yes
          </button>
        </footer>
      </div>
    </Fragment>
  );

  return show ? template : null;
}
