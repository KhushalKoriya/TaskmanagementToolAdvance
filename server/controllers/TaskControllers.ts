import { Request, Response } from 'express';
import Task, { TaskDocument } from '../models/Task';
import { io } from '../server';
// Fetch all tasks
export const fetchTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ sortingOrder: 1 });
    res.json(tasks); // Sending response within the function
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new task
export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, status } = req.body;
    const image = req.file ? req.file.path : null;
    const task = new Task({ title, image, status });
    const savedTask = await task.save();
    io.emit('taskAdded', savedTask);
    res.status(201).json(savedTask); // Sending response within the function
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Edit a task by ID
export const editTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, status, sortingOrder } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, image, status, sortingOrder }, { new: true });
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
      return; // Return after sending response
    }
    io.emit('taskUpdated', updatedTask);
    res.json(updatedTask); // Sending response within the function
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
      return; // Return after sending response
    }
    io.emit('taskDeleted', deletedTask);
    res.json({ message: 'Task deleted' }); // Sending response within the function
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Update task order in database
export const updateOrders = async (req: Request, res: Response): Promise<void> => {
  const newTaskOrder = req.body.taskOrder;
  console.log(newTaskOrder, "newTaskOrder");
  const bulkOps: any = []
  try {
    newTaskOrder.map((task: TaskDocument, index: number) => {
      const data = {
        updateOne: {
          filter: { _id: task._id },
          update: { sortingOrder: index, status: task.status } // Use $set atomic operator to update the 'order' field
        }
      }
      console.log(data,"mappingData");
      
      return bulkOps.push(data)
    });

    await Task.bulkWrite(bulkOps);
    const tasks = await Task.find().sort({ sortingOrder: 1 });
    io.emit('taskOrderUpdated', tasks);
    res.status(200).send('Task order updated successfully');
  } catch (error) {
    console.error('Error updating task order:', error);
    res.status(500).send('Internal Server Error');
  }
};