import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerUser() {
    if (!name || !email || !password) {
      alert("Please fill in all details.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login to continue.");

        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="register-page">
      <div className="register-container">
        <h1>Create Account</h1>

        <div className="register-form">
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={registerUser}
            disabled={loading}
          >
            {loading ? "CREATING ACCOUNT..." : "REGISTER"}
          </button>

          <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
