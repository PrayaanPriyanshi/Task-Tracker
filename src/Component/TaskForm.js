import React, { useState, useEffect } from "react";

// TaskForm component is defined here, taking various props and state variables as input
const TaskForm = ({ addTask, editTaskId, tasks, setEditTaskId, setTasks }) => {
  // State variables to store form input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // useEffect is used for side effects, here it updates the form when editing a task
  useEffect(() => {
    if (editTaskId !== null) {
      const taskToEdit = tasks.find((task) => task.id === editTaskId);
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
      setDueTime(taskToEdit.dueTime);
      setIsCompleted(taskToEdit.completed);
    }
  }, [editTaskId, tasks]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editTaskId !== null) {
      // If editing a task, update the task
      const updatedTask = {
        id: editTaskId,
        title,
        description,
        dueDate,
        dueTime,
        completed: isCompleted,
      };

      const taskIndex = tasks.findIndex((task) => task.id === editTaskId);
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = updatedTask;
      setTasks(updatedTasks);
    } else {
      // If adding a new task, create a new task object
      const newTask = {
        id: new Date().getTime(),
        title,
        description,
        dueDate,
        dueTime,
        completed: false,
      };

      addTask(newTask);
    }

    // Reset form input values
    setTitle("");
    setDescription("");
    setDueDate("");
    setDueTime("");
    setEditTaskId(null);

    // Check if the task due date and time is in the future, then set a reminder
    const now = new Date();
    const dueDateTime = new Date(dueDate + " " + dueTime);
    if (dueDateTime > now) {
      const timeDiff = dueDateTime - now;
      setTimeout(() => {
        alert(`Task "${title}" is pending!`);
      }, timeDiff);
    }
  };

  // JSX for the form
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* Input field for task title */}
      <input
        className="input"
        type="text"
        placeholder="Task Title...."
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Textarea for task description */}
      <textarea
        className="textarea"
        placeholder="Task Description...."
        name="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Input field for due date */}
      <input
        className="date"
        type="date"
        name="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* Input field for due time */}
      <input
        className="time"
        type="time"
        name="time"
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
      />

      {/* Button to submit the form */}
      <button type="submit">
        {editTaskId !== null ? "Edit Task" : "Add Task"}
      </button>
    </form>
  );
};

// Exporting the TaskForm component for use in other parts of the application
export default TaskForm;
