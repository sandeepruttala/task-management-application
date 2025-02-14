import { ListTodo } from "lucide-react";
import "../styles/LandingPage.css";

function App() {
  return (
    <div className="lp-app">
      <header className="lp-header">
        <div className="lp-logo">
          <div className="lp-logo-icon">
            <ListTodo color="white" />
          </div>
          <span>Task Master</span>
        </div>
        <nav>
          <button className="lp-btn lp-btn-login" onClick={() => window.location.href = "/login"}>Log In</button>
          {/* <button className="lp-btn lp-btn-signup" onClick={() => window.location.href = "/register"}>Sign Up</button> */}
        </nav>
      </header>
      <main className="lp-main">
        <span>
          <span style={{ color: "#2563eb", fontWeight:"bold" }}>TaskMaster</span>, Where Tasks Meet
          Mastery, Every Single Day, Every Single <span style={{ color: "#2563eb"}}>Time.</span>
        </span>
        <div style={{ height: "20px" }}></div>
        <p>
          Streamline your workflow and boost productivity with our powerful task
          management system.
        </p>
        <button onClick={() => window.location.href = "/register"}className="lp-btn lp-btn-cta">Get Started</button>
      </main>
    </div>
  );
}

export default App;
