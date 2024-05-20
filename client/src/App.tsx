import React from "react";
import Header from "./component/Header";
import TaskManager from "./component/taskManager/TaskManager";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <TaskManager />
    </>
  );
}

export default App;
