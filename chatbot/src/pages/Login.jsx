import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import {handleSuccess, handleError} from "../utils/toast"; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Hardcoded users (students and faculty)
  const users = [
    { id: 1, email: "21kd1a0538@example.com", password: "21kd1a0538", role: "student" },
    { id: 2, email: "21kd1a0515@example.com", password: "21kd1a0515", role: "student" },
    { id: 3, email: "21kd1a0547@example.com", password: "21kd1a0517", role: "student" },
    { id: 4, email: "21kd1a0511@example.com", password: "21kd1a0511", role: "student" },
    { id: "f1", email: "venu@example.com", password: "faculty123", role: "faculty" },
    { id: "f2", email: "anjireddy@example.com", password: "faculty123", role: "faculty" }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
  
    setLoading(true);
  
    try {
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        localStorage.setItem("user", JSON.stringify(user)); 
  
        if (user.role === "student") {
          handleSuccess("Login successful! Redirecting to student dashboard...");
          setTimeout(() => {  
          navigate(`/student/${user.id}`);
          }
          , 2000);
        } else if (user.role === "faculty") {
          handleSuccess("Login successful! Redirecting to faculty dashboard...");
          setTimeout(() => {
          navigate(`/faculty/${user.id}`);
        }
        , 2000);
        }
      } else {
        // alert("Invalid email or password");
        handleError("Invalid email or password");
      }
    } catch (error) {
      // alert("An error occurred during login");
      handleError("An error occurred during login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <ToastContainer />

      <div className="flex flex-grow items-center justify-center pt-16 px-6">
        <div className="max-w-md w-full">

          {/* User Type Selector */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4">
              <button
                className="w-full text-gray-700 p-4 border-b-2 border-transparent shadow-sm hover:border-blue-500 focus:outline-none rounded-md cursor-pointer"
                onClick={() => {
                  setEmail("21kd1a0538@example.com");
                  setPassword("21kd1a0538");
                }}
              >
                Student
              </button>
              <button
                className="w-full text-gray-700 p-4 border-b-2 border-transparent shadow-sm hover:border-blue-500 focus:outline-none rounded-md cursor-pointer"
                onClick={() => {
                  setEmail("venu@example.com");
                  setPassword("faculty123");
                }}
              >
                Faculty
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-gray-700 font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                disabled={loading}
              >
                {loading ? <span>Logging in...</span> : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
