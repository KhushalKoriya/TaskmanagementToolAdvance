import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:3002";

export interface Task {
  _id: string;
  title: string;
  image: string;
  status: string;
  createdAt: string;
  sortingOrder: number;
}

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response: AxiosResponse<Task[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (task: FormData): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await axios.post(API_URL, task, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (id: string, updatedTask: FormData): Promise<Task> => {
  console.log(updatedTask,"updatedTask");
  
  try {
    const response: AxiosResponse<Task> = await axios.put(`${API_URL}/${id}`, updatedTask, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const updateTaskOrderInDatabase = async (taskOrder: Task[]): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axios.put(`${API_URL}/latestupdate/updateOrder`, { taskOrder });
    if (response.status !== 200) {
      throw new Error("Failed to update task order in database");
    }
    console.log("Task order updated in database:", response.data);
  } catch (error) {
    console.error("Error updating task order in database:", error.message);
    throw error;
  }
};
