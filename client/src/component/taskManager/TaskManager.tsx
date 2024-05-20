import React, { ChangeEvent, FormEvent, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import UpdateForm from "../updateTask/UpdateTask";
import DeleteMessage from "../deleteTask/DeleteMessage";
import DeleteConfirmationDialog from "../deleteTask/DeleteConfirmationDialog";
import DraggableList from "../draggable/DraggableList";
import {
  addTask,
  updateTask,
  deleteTask,
  updateTaskOrderInDatabase,
} from "../../services/taskService";
import useTasksSocket from "../../services/useTasksSocket";
import "./TaskManager.css";

const TaskManager: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputImage, setInputImage] = useState<File | null>(null);
  const [disableTask, setDisableTask] = useState<string>("");
  const [isEditItem, setIsEditItem] = useState<string | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [inputImageName, setInputImageName] = useState<string | File>(""); // Add this state
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const { items, setItems } = useTasksSocket();


  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = e.target;
    if (name === "Title") setInputTitle(value);
    else if (name === "Image" && files) { setInputImage(files[0]); setInputImageName(files[0]) };
  };

  const onAddClick = (status: string) => {
    setShowForm(true);
    setStatus(status);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!inputTitle) {
      alert("Please fill in the title.");
      return;
    }

    if (!inputImage && !isEditItem) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", inputTitle);
    if (inputImage) {
      formData.append("image", inputImage);
    } else if (isEditItem && existingImage) {
      formData.append("existingImage", existingImage);
    }

    try {
      if (isEditItem) {
        const taskToEdit = items.find((item) => item._id === isEditItem);
        if (!taskToEdit) {
          console.error("Task to edit not found.");
          return;
        }
        formData.append("status", taskToEdit.status);
        await updateTask(isEditItem, formData);
        setIsEditItem(null);
        setDisableTask("");
      } else {
        formData.append("status", status);
        await addTask(formData);
      }
      setExistingImage(null);
      setInputTitle("");
      setInputImageName("");
      setInputImage(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const handleCancel = (): void => {
    setShowForm(false);
    setInputTitle("");
    setInputImage(null);
    setIsEditItem(null);
    setDisableTask("");
  };

  const handleEdit = (id: string): void => {
    const taskToEdit = items.find((item) => item._id === id);
    if (taskToEdit) {
      setDisableTask(id);
      setInputTitle(taskToEdit.title);
      setInputImageName(taskToEdit.image);
      setExistingImage(taskToEdit.image || null);
      setInputImage(null);
      setIsEditItem(id);
      setShowForm(true);
    }
  };

  const handleDelete = (id: string): void => {
    setShowDeleteConfirmation(true);
    setTaskToDeleteId(id);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    try {
      if (taskToDeleteId) {
        await deleteTask(taskToDeleteId);
        setDeleteMessage(true);
        setShowDeleteConfirmation(false);
        setTimeout(() => {
          setDeleteMessage(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCancelDelete = (): void => {
    setShowDeleteConfirmation(false);
  };

  const handleOnDragEnd = async (result: any): Promise<void> => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const updatedItems = [...items];

    const movedItem = updatedItems.find((item) => item._id === draggableId);

    if (!movedItem) return;

    if (source.droppableId === destination.droppableId) {
      const columnItems = updatedItems.filter((item) => item.status === source.droppableId);
      const remainingItems = updatedItems.filter((item) => item.status !== source.droppableId);
      const [removedItem] = columnItems.splice(source.index, 1);
      let insertIndex = destination.index;
      if (destination.index > source.index) {
        insertIndex = destination.index;
      }
      columnItems.splice(insertIndex, 0, removedItem);
      const latestData = [...columnItems, ...remainingItems];
      setItems(latestData);
      await updateTaskOrderInDatabase(latestData);
    } else {
      if (!movedItem) return;
      movedItem.status = destination.droppableId;
      movedItem.sortingOrder = destination.index;
      const sourceColumnItems = updatedItems.filter((item) => item.status === source.droppableId);
      sourceColumnItems.splice(source.index, 1);
      const destinationColumnItems = updatedItems.filter((item) => item.status === destination.droppableId);
      destinationColumnItems.splice(destination.index, 0, movedItem);
      setItems(updatedItems);
      let newObj = [...updatedItems];
      newObj = newObj.filter((obj) => obj.status === destination.droppableId);
      newObj = newObj.filter((obj) => obj._id !== movedItem._id);
      newObj.splice(destination.index, 0, movedItem);
      await updateTaskOrderInDatabase(newObj);
    }
  };

  return (
    <>
      {showDeleteConfirmation && (
        <DeleteConfirmationDialog
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div className="container">
        {showForm && (
          <div className="container border rounded d-flex justify-content-center shadow p-3">
            <div className="row">
              <div className="text-center">
                <h2>{isEditItem ? "Edit Task" : "Add Task"}</h2>
              </div>
              <UpdateForm
                inputTitle={inputTitle}
                inputImage={inputImage}
                inputImageName={existingImage || ''}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                buttonText={isEditItem ? "Update" : "Save"}
                handleCancel={handleCancel}
                cancelText="Cancel"
              />
            </div>
          </div>
        )}

        <div className="container py-2">
          {deleteMessage && <DeleteMessage />}

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <DraggableList
              items={items}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              disableTask={disableTask}
              onAddClick={onAddClick}
            />
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default TaskManager;
