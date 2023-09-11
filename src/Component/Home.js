// Importing necessary modules and styles
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./home.css"; // Styles for the Home component

// Home component is defined here
function Home() {
  // State variables for managing tasks and the task being edited
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);

  // Function to add a new task to the tasks array
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Function to mark a task as completed
  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to set the task being edited
  const editTask = (taskId) => {
    setEditTaskId(taskId);
  };

  // Function to calculate and display task due date notifications using toast messages
  const calculateDueDateNotifications = () => {
    const now = new Date();
    const notifiedTasks = new Set();

    tasks.forEach((task) => {
      const dueDateTime = new Date(task.dueDate + " " + task.dueTime);
      const timeDiff = dueDateTime - now;
      const daysDiff = timeDiff / 1000; // Convert milliseconds to seconds

      // Check if the task is overdue and not completed
      if (daysDiff < 0 && !task.completed && !notifiedTasks.has(task.id)) {
        toast.warning(`Task "${task.title}" is overdue!`);
        notifiedTasks.add(task.id);
      } else if (
        daysDiff >= 0 &&
        daysDiff < 2 &&
        !task.completed &&
        !notifiedTasks.has(task.id)
      ) {
        toast.info(`Task "${task.title}" is expiring soon.`);
        notifiedTasks.add(task.id);
      }
    });
  };

  // Use useEffect to trigger due date notifications when tasks change
  useEffect(() => {
    calculateDueDateNotifications();
  }, [tasks]);

  // Rendering the Home component with TaskForm and TaskList components
  return (
    <div className="app">
      <h1 style={{background:'rgb(255 206 228)'}} className="h1">
        <u style={{color:"deeppink"}}> Task Tracker</u>
      </h1>
      <TaskForm
        addTask={addTask}
        editTaskId={editTaskId}
        tasks={tasks}
        setEditTaskId={setEditTaskId}
        setTasks={setTasks} // Pass the setTasks function to TaskForm
      />
      <TaskList
        tasks={tasks}
        completeTask={completeTask}
        deleteTask={deleteTask}
        editTask={editTask} // Pass the editTask function to TaskList component
      />

      {/* ToastContainer to display toast notifications */}
      <ToastContainer position="top-right" autoClose={60000} />
    </div>
  );
}

// Exporting the Home component for use in other parts of the application
export default Home;
