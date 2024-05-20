import express, { Request, Response } from 'express';
import { addTask, deleteTask, editTask, fetchTask, updateOrders } from '../controllers/TaskControllers';
import upload from '../middleware/upload';

const router = express.Router();

// Fetch all tasks
router.get('/', async (req: Request, res: Response) => {
  await fetchTask(req, res);
});

// Add a new task
router.post('/', upload.single('image'), async (req: Request, res: Response) => {
  await addTask(req, res);
});

// Edit a task by ID
router.put('/:id', upload.single('image'), async (req: Request, res: Response) => {
  await editTask(req, res);
});

// Update task order in database
router.put('/latestupdate/updateOrder', async (req: Request, res: Response) => {
  await updateOrders(req, res);
});

// Delete a task by ID
router.delete('/:id', async (req: Request, res: Response) => {
  await deleteTask(req, res);
});

export default router;
