import React from "react";

const DeleteMessage: React.FC = () => {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      You have deleted the task successfully.
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default DeleteMessage;
