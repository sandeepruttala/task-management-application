/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "./Config";
import { LogOut, ListTodo, Plus, Loader2 } from "lucide-react";
import TaskCard from "./components/TaskCard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/Sheet";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    userId: "",
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const checkSession = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/auth/session-check`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    const toastId = toast.loading('Fetching tasks...');
    try {
      const response = await fetch(`${SERVER_URL}/tasks/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        const tasksArray = Array.isArray(data) ? data : data.tasks || [];
        setTasks(tasksArray);
        toast.success('Tasks fetched successfully', { id: toastId });
      } else {
        console.error("Failed to fetch tasks:", data);
        setTasks([]);
        toast.error('Failed to fetch tasks', { id: toastId });
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
      toast.error('Error fetching tasks', { id: toastId });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;

    const toastId = toast.loading('Adding new task...');
    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: user.id,
          title: newTask.title,
          description: newTask.description,
          status: "pending",
        }),
      });

      if (response.ok) {
        setNewTask({ title: "", description: "" });
        setIsOpen(false);
        await fetchTasks();
        toast.success('Task added successfully', { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add task', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async () => {
    if (!currentTask?.title?.trim()) return;

    const taskId = currentTask._id || currentTask.id;

    if (!taskId) {
      console.error("No task ID found:", currentTask);
      return;
    }

    const toastId = toast.loading('Updating task...');
    try {
      setIsLoading(true);

      const response = await fetch(`${SERVER_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: currentTask.title,
          description: currentTask.description,
          status: currentTask.status || "pending",
        }),
      });
      if (response.ok) {
        await fetchTasks();
        setIsOpen(false);
        setCurrentTask(null);
        setIsUpdateMode(false);
        toast.success('Task updated successfully', { id: toastId });
      } else {
        const errorData = await response.json();
        console.error("Failed to update task:", errorData);
        toast.error('Failed to update task', { id: toastId });
      }
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error('Error updating task', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!taskId) {
      console.error("Invalid task ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this task?")) return;

    const toastId = toast.loading('Deleting task...');
    try {
      const response = await fetch(`${SERVER_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
        toast.success('Task deleted successfully', { id: toastId });
      } else {
        const error = await response.json();
        console.error("Failed to delete task:", error);
        toast.error('Failed to delete task', { id: toastId });
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error('Error deleting task', { id: toastId });
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    if (!taskId) {
      console.error("Task ID is undefined");
      return;
    }

    const toastId = toast.loading(`Marking task as ${newStatus}...`);
    try {
      const status = newStatus === "completed" ? "complete" : "incomplete";
      const response = await fetch(`${SERVER_URL}/tasks/${taskId}/${status}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchTasks();
        toast.success(`Task marked as ${newStatus}`, { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error(`Failed to mark task as ${newStatus}`, { id: toastId });
    }
  };

  const openUpdateSheet = (task) => {
    setCurrentTask({
      ...task,
      _id: task._id || task.id,
      id: task.id || task._id,
    });
    setIsUpdateMode(true);
    setIsOpen(true);
  };

  if (!user) {
    return null;
  }

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div className="app-container">
      <Toaster position="top-right" />
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon">
            <ListTodo color="white" />
          </div>
          <span className="logo-text">TaskMaster</span>
        </div>
        <div className="header-right">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <main className="main-content">
        <div className="content-grid">
          <div className="tasks-column pending-column">
            <div className="column-header">
              <div>
                <h2>Welcome {user.name}</h2>
                <p className="subtitle">Here are your pending tasks</p>
              </div>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button
                    className="add-task-btn"
                    onClick={() => {
                      setIsUpdateMode(false);
                      setCurrentTask(null);
                    }}
                  >
                    <Plus className="icon" />
                    <span>Add Task</span>
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      {isUpdateMode ? "Update Task" : "Add New Task"}
                    </SheetTitle>
                    <SheetDescription>
                      {isUpdateMode
                        ? "Update the task details below."
                        : "Create a new task by filling out the details below."}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="sheet-form">
                    <div className="form-group">
                      <input
                        type="text"
                        value={
                          isUpdateMode
                            ? currentTask?.title || ""
                            : newTask.title
                        }
                        onChange={(e) =>
                          isUpdateMode
                            ? setCurrentTask({
                                ...currentTask,
                                title: e.target.value,
                              })
                            : setNewTask({ ...newTask, title: e.target.value })
                        }
                        placeholder="Task Title"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        value={
                          isUpdateMode
                            ? currentTask?.description || ""
                            : newTask.description
                        }
                        onChange={(e) =>
                          isUpdateMode
                            ? setCurrentTask({
                                ...currentTask,
                                description: e.target.value,
                              })
                            : setNewTask({
                                ...newTask,
                                description: e.target.value,
                              })
                        }
                        placeholder="Task Description"
                        className="form-textarea"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (isUpdateMode) {
                          handleUpdateTask();
                        } else {
                          handleAddTask();
                        }
                      }}
                      className="submit-btn"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? isUpdateMode
                          ? "Updating..."
                          : "Adding..."
                        : isUpdateMode
                        ? "Update Task"
                        : "Add Task"}
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="tasks-list">
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteTask}
                    onEdit={openUpdateSheet}
                  />
                ))
              ) : (
                <div className="no-tasks">
                  <p>No pending tasks. Add a new task to get started!</p>
                </div>
              )}
            </div>
          </div>

          <div className="tasks-column completed-column">
            <div className="column-header">
              <div>
                <h2>Completed Tasks</h2>
                <p className="subtitle">Here are your completed tasks</p>
              </div>
            </div>
            <div className="tasks-list">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteTask}
                    onEdit={openUpdateSheet}
                  />
                ))
              ) : (
                <div className="no-tasks">
                  <p>No completed tasks yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;