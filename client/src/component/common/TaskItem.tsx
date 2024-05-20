import React from "react";
import Button from "./Button";
import "./Taskitem.css";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
interface TaskItemProps {
  item: {
    _id: string;
    title: string;
    image?: string;
    createdAt: string;
  };
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  disableTask: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  item,
  handleEdit,
  handleDelete,
  disableTask,
}) => {
  const isDeleteButtonDisabled = disableTask === item._id;
  const buttonColorClass = isDeleteButtonDisabled
    ? " disabled-button"
    : "";
  const formatCreatedAtDate = (createdAt: string | undefined) => {
    if (!createdAt) return "";
    const date = new Date(createdAt);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = months[monthIndex];

    return `${day} ${month}`;
  };
  return (
    <div className="row border rounded shadow p-3 mb-3 bg-white rounded p-2">
      <div className="col-12  justify-content-between align-items-center">
        <div>
          <h4>{item.title}</h4></div>
        <span className="countData_draggable"> {formatCreatedAtDate(item.createdAt)}</span>

        <div>  <br />{item.image && (
          <img
            src={`http://localhost:3002/${item.image}`}
            alt={item.title}
            className="task-image-photos"
          />
        )}
        </div>
        <div className="col-12  d-flex justify-content-between align-items-center">
          <div>
            <AccountCircleIcon /></div>
          <div>
            <Button onClick={() => handleEdit(item._id)} color="" text="">
              <DriveFileRenameOutlineIcon className="countData_draggable"/>
            </Button>
            <Button onClick={() => handleDelete(item._id)} color={buttonColorClass} text="">
              <DeleteOutlineIcon className="countData_draggable"/>
            </Button></div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
