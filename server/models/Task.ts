import mongoose, { Document } from 'mongoose';

// Define the schema for the Task document
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'inprogress', 'completed'],
    default: 'todo',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sortingOrder:{
    type: Number,
    default: 0,
  }
});

// Define the interface representing a Task document
export interface TaskDocument extends Document {
  title: string;
  image: string;
  status: 'todo' | 'inprogress' | 'completed';
}

// Define and export the Task model based on the schema and document interface
const Task = mongoose.model<TaskDocument>('Task', taskSchema);

export default Task;
