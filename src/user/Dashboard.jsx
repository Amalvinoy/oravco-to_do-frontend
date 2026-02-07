import React, { useState, useEffect } from "react";
import { createTaskAPI, getTasksAPI, updateTaskStatusAPI, deleteTaskAPI } from "../services/allAPIs";

const Dashboard = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("pending");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await getTasksAPI(token);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    try {
      await createTaskAPI({ title: task, description, status }, token);
      setTask("");
      setDescription("");
      setStatus("pending");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("pending");

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description || "");
    setEditStatus(item.status || "pending");
  };

  const handleUpdateTask = async (id) => {
    try {
      await updateTaskStatusAPI(id, { title: editTitle, description: editDescription, status: editStatus }, token);
      setEditId(null);
      setEditTitle("");
      setEditDescription("");
      setEditStatus("pending");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteTaskAPI(id, token);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">     
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            My Tasks
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <form
          onSubmit={handleAddTask}
          className="flex gap-3 mb-6"
        >
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Add
          </button>
        </form>
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">
              No tasks yet
            </p>
          ) : (
            tasks.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div>
                    {editId === item._id ? (
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="px-2 py-1 border rounded"
                        />
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="px-2 py-1 border rounded"
                        />
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="px-2 py-1 border rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateTask(item._id)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-semibold text-gray-800">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          Status: {item.status === "completed" ? "Completed" : "Not completed"}
                        </div>
                        {item.createdDate && (
                          <div className="text-xs text-gray-400">
                            Created: {new Date(item.createdDate).toLocaleString()}
                          </div>
                        )}
                        {item.description && (
                          <div className="text-sm text-gray-500">{item.description}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {editId !== item._id && (
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
