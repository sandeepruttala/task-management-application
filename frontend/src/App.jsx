import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "./Config";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const checkSession = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/auth/session-check`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data)
          setUser(data);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkSession();
  }, [navigate]);

  return <>Home, welcome {user ? user.name : "Guest"}</>;
}

export default App;
