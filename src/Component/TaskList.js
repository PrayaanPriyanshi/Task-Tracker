// Importing necessary modules and icons from React and react-icons library
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GrCompliance } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";

// TaskList component is defined here, taking props as input
const TaskList = ({ tasks, completeTask, deleteTask, editTask }) => {
  return (
    // This div element will contain the list of tasks
    <div className="task-list">
      {tasks.map((task) => (
        // Each task is rendered as a separate div
        <div
          key={task.id} // Unique key for each task, usually the 'id'
          className={`task ${task.completed ? "completed" : ""}`}
        >
          {/* Task details are displayed here */}
          <div className="task-details">
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Due Date: {task.dueDate}</p>
          </div>
          {/* Buttons for task actions (complete, delete, edit) */}
          <div className="btnbackground">
            <div className="task-actions">
              {/* Button to mark a task as complete */}
              <button
                onClick={() => completeTask(task.id)} // Calls completeTask function when clicked
                title="Complete Task" // Tooltip for the button
              >
                <GrCompliance className="complete" color="blue" />
              </button>
              {/* Button to delete a task */}
              <button onClick={() => deleteTask(task.id)} title="Delete Task">
                <AiOutlineDelete className="complete" />
              </button>
              {/* Button to edit a task */}
              <button onClick={() => editTask(task.id)} title="Edit Task">
                <FiEdit className="complete" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Exporting the TaskList component to make it available for use in other parts of the application
export default TaskList;
