# Task Management Tool

This is a task management application built using websockets for real-time communication.

## Features

- Add new tasks with title and Images.
- Edit existing tasks.
- Delete tasks.
- Drag and drop tasks to reorder like Horizontal and Verticle drag and drop.
- Real-time updates using websockets.
- Task state like TODO, INPROGRESS, COMPLETED.

## Technologies Used

- Frontend: React.js, Websocket, Typescript
- Backend: Node.js, Express.js, WebSocket, Typescript
- Database: MongoDB

## Database Connection 
- To connect to the MongoDB database, use the following connection string:   mongodb://127.0.0.1:27017/
- Ensure that MongoDB Compass is running on your local machine or the specified server.
  
## Installation

- npm install (for installation all dependencies)

## Build

- npm run build (First install node packages then build the project)

## Start server

- npm start (here we can start both server concurrently using npm start)


## Project Architecture
- The project is divided into two main parts: the client and the server.

Client
- The client side is built with React.js and uses WebSockets for real-time updates. TypeScript is used for type safety and to improve code quality.

Server
- The server side is built with Node.js and Express.js. It handles WebSocket connections for real-time communication and interacts with the MongoDB database to store and retrieve task data. TypeScript is used to ensure type safety and improve code quality.


## Design Decisions
- Real-time Updates: WebSockets were chosen for real-time updates to provide a seamless user experience. This ensures that all connected clients receive updates instantly when a task is added, edited, deleted, or reordered.
- TypeScript: Both the client and server use TypeScript to leverage static typing, which helps catch errors early in the development process and improves overall code quality.
- Drag and Drop: The drag-and-drop feature was implemented to enhance the user experience by allowing users to easily reorder tasks. This functionality is crucial for managing tasks efficiently.


## Usage Instructions
- Add a Task:

Click the "+" button in the desired task state column (TODO, INPROGRESS, COMPLETED).
Fill in the task title and upload an image.
Click "Save" to add the task.

- Edit a Task:

Click the "Edit" button on the task you want to edit.
Modify the task title and/or image.
Click "Update" to save the changes.

- Delete a Task:

Click the "Delete" button on the task you want to delete.
Confirm the deletion in the popup dialog.

- Reorder Tasks:

Drag and drop tasks within the same column or across different columns to reorder them.
