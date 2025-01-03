import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddTask = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const {user} =useSelector((state)=>state.user)
    const token = document.cookie.split("=")[1];
  const [formData, setFormData] = useState({
    assignBy:user?.username,
    title: "",
    description: "",
    status: "pending",
    assingTo: [""],
  });
  const [error,setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleassingToChange = (index, value) => {
    const updatedassingTo = [...formData.assingTo];
    updatedassingTo[index] = value;
    setFormData({ ...formData, assingTo: updatedassingTo });
  };

  const addassingToField = () => {
    setFormData({ ...formData, assingTo: [...formData.assingTo, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setError(null)
        console.log(formData)
      await axios.post(`${backendUrl}/task/addtask`, formData,{withCredentials:true},{ headers: { authentication: token } });
      alert("Task added successfully!");
      setFormData({
        assignBy: "",
        title: "",
        description: "",
        status: "pending",
        assingTo: [""],
      });
      
    } catch (error) {
        setError(error?.response?.data?.message)
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-2 bg-white shadow-md rounded-lg">
        {error &&(<div className="text-red-500 text-center text-lg font-semibold">
            {error}
        </div>)}
      <h2 className="text-xl font-semibold mb-4 text-center">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Assign To</label>
          {formData.assingTo.map((assignee, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={assignee}
                onChange={(e) => handleassingToChange(index, e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
              {index === formData.assingTo.length - 1 && (
                <button
                  type="button"
                  onClick={addassingToField}
                  className="ml-2 bg-slate-800 text-white p-2 rounded"
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
