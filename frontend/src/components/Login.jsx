import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginUser() {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("login"));
        alert("Login successful!");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-page">
      <div className="login-container">
        <h1>Login</h1>

        <div className="login-form">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={loginUser}
            disabled={loading}
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>

          <p>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;