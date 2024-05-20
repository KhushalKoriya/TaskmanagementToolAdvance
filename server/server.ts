import express, { Express } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import taskRoutes from './routes/TaskRoutes';
import path from 'path';
import cors from 'cors';
import http from "http";
import { Server } from "socket.io";
import Task from './models/Task';

const app: Express = express();
const PORT: number = 3002;

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

const allowedDomains: string[] = ['http://localhost:5173'];
app.use(cors({ origin: allowedDomains, credentials: true }));

// Database connection
const connectDB = async (): Promise<void> => {
  try {
    const uri: string = 'mongodb://127.0.0.1:27017/taskManagerData';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); 
  }
};

connectDB();

// Routes
app.use('/', taskRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on('connection', async (socket) => {
  console.log('New client connected');

  try {
    const tasks = await Task.find().sort({ sortingOrder: 1 });
    socket.emit('initialTasks', tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
  }

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export { io };