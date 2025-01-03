import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tasks from "../components/Tasks";
import Profile from "../components/Profile";
import AddTask from "./AddTask";
import { loginOut } from "../Redux/slices/userSlice";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [activeSection, setActiveSection] = useState("tasks");

  const handleLogOut = () => {
    dispatch(loginOut());
    navigate("/");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "tasks":
        return <Tasks />;
      case "profile":
        return <Profile />;
      case "addTask":
        return <AddTask />;
      default:
        return <Tasks />;
    }
  };

  return (
    <div className="md:flex block h-screen">
      <div className="bg-slate-800 md:h-screen w-full md:w-1/5 text-white flex flex-col justify-between">
        <div className="p-4 text-center">
          <span className="text-lg font-bold">{user?.username}</span>
          <span
            className="md:hidden p-1 bg-slate-100 m-2 ms-6 font-semibold text-red-600 rounded hover:bg-slate-900 hover:cursor-pointer"
            onClick={handleLogOut}
          >
            Log Out
          </span>

          <div
            className="p-2 bg-slate-700 m-2 font-semibold rounded hover:bg-slate-900 hover:cursor-pointer"
            onClick={() => setActiveSection("tasks")}
          >
            Assign Tasks
          </div>
          <div
            className="p-2 bg-slate-700 m-2 font-semibold rounded hover:bg-slate-900 hover:cursor-pointer"
            onClick={() => setActiveSection("profile")}
          >
            Profile
          </div>
          {user?.role === "admin" && (
            <div
              className="p-2 bg-slate-700 m-2 font-semibold rounded hover:bg-slate-900 hover:cursor-pointer"
              onClick={() => setActiveSection("addTask")}
            >
              Add Task
            </div>
          )}
        </div>
        <div className="p-6 text-center md:block hidden">
          <div
            className="p-2 bg-slate-100 m-2 font-semibold text-red-600 rounded hover:bg-slate-900 hover:cursor-pointer"
            onClick={handleLogOut}
          >
            Log Out
          </div>
        </div>
      </div>
      <div className="md:p-6 p-1 shadow-2xl rounded-2xl border-dashed border-4 min-h-full md:w-full border-slate-800 m-4">
        {renderActiveSection()}
      </div>
    </div>
  );
}

export default Dashboard;
