import React, { ChangeEvent, FormEvent } from "react";

interface UpdateFormProps {
  inputTitle: string;
  inputImage: File | null;
  inputImageName: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  buttonText: string;
  handleCancel: () => void;
  cancelText: string;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  inputTitle,
  inputImage,
  inputImageName,
  handleInput,
  handleSubmit,
  buttonText,
  handleCancel,
  cancelText
}) => (
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="taskTitle" className="form-label">Title</label>
      <input
        type="text"
        className="form-control"
        id="taskTitle"
        name="Title"
        value={inputTitle}
        onChange={handleInput}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="taskImage" className="form-label">Image</label>
      <input
        type="file"
        className="form-control"
        id="taskImage"
        name="Image"
        onChange={handleInput}
      />
      {inputImageName && <p>Uploaded Image: {inputImageName.replace("uploads\\", "")}</p>}
    </div>
    <button type="submit" className="btn btn-primary">{buttonText}</button>
    <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>{cancelText}</button>
  </form>
);

export default UpdateForm;
