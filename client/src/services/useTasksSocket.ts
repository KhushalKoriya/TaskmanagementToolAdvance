import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Task } from "./taskService";

const socket = io("http://localhost:3002");

const useTasksSocket = () => {
  const [items, setItems] = useState<Task[]>([]);

  useEffect(() => {
    socket.on("initialTasks", (data) => {
      setItems(data);
    });

    socket.on("taskAdded", (newTask) => {
      setItems((prevItems) => [...prevItems, newTask]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === updatedTask._id ? updatedTask : item))
      );
    });

    socket.on("taskDeleted", (deletedTask) => {
      setItems((prevItems) => prevItems.filter((item) => item._id !== deletedTask._id));
    });

    socket.on("taskOrderUpdated", (updatedOrder) => {
      setItems(updatedOrder);
    });
  }, []);

  return { items, setItems };
};

export default useTasksSocket;
