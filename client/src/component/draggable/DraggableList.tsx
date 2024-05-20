import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";
import { Task } from "../../services/taskService";
import "./Draggable.css";

interface DraggableListProps {
  items: Task[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  disableTask: string;
  onAddClick: (status: string) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({
  items,
  handleEdit,
  handleDelete,
  disableTask,
  onAddClick,
}) => {
  const sections = [
    { status: "todo", title: "Todo" },
    { status: "inprogress", title: "In Progress" },
    { status: "completed", title: "Completed" },
  ];

  return (
    <div className="row">
      {sections.map((section) => {
        const sectionItems = items.filter((item) => item.status === section.status);
        return (
          <div className="col" key={section.status}>
            <div className="draggableHeading">
              <h2>
                {section.title} <span className="countData_draggable">{sectionItems.length}</span>
              </h2>
            </div>
            <div className="draggableTodo">
              <button onClick={() => onAddClick(section.status)} className="draggableButton">
                +
              </button>
            </div>
            <div className="draggableContent">
              <Droppable droppableId={section.status}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {sectionItems.map((item, index) => (
                      <DraggableItem
                        key={item._id}
                        item={item}
                        index={index}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        disableTask={disableTask}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DraggableList;
