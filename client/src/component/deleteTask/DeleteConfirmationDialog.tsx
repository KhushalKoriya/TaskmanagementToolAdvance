import React, { MouseEvent } from "react";
import "./Deletemodal.css";
import Button from "../common/Button";

interface DeleteConfirmationDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  onConfirm,
  onCancel,
}) => {
  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Deletion</h5>
          <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
        </div>
        <div className="modal-body">
          Are you sure you want to delete this task?
        </div>
        <div className="modal-footer">
          <Button
            onClick={handleCancel}
            text="No"
            color="secondary"
          />
          <Button
            onClick={onConfirm}
            text="Yes"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
