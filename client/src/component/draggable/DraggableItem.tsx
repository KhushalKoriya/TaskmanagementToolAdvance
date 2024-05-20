import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskItem from "../common/TaskItem";
import { Task } from "../../services/taskService"; // Import the Task type from your service

interface DraggableItemProps {
  item: Task;
  index: number;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  disableTask: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  index,
  handleEdit,
  handleDelete,
  disableTask,
}) => {
  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskItem
            item={item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            disableTask={disableTask}
          />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
