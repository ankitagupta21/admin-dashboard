import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";

const DeleteButton = ({ onClick }) => {
  return (
    <button className="delete" onClick={onClick}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeleteButton;
