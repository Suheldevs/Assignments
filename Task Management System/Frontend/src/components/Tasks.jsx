import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Tasks() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useSelector((state) => state.user);
  const [tasks, setTask] = useState([]);
  const [error, setError] = useState(null);
  const token = document.cookie.split("=")[1];
  const taskFetch = async () => {
    if (user.role == "admin") {
      try {
        const res = await axios.get(
          `${backendUrl}/task/getall`,
          { withCredentials: true },
          { headers: { authentication: token } }
        );
        setTask(res.data);
        setError(null);
        console.log(res);
      } catch (err) {
        console.log("fetch error", err);
        setError(err?.response?.data?.message);
      }
    } else {
      try {
        const res = await axios.post(
          `${backendUrl}/task/get`,
          { user: user.username },
          { withCredentials: true },
          { headers: { authentication: token } }
        );
        setTask(res.data);
      } catch (err) {
        console.log("fetch error", err);
        setError(err?.response?.data?.message);
      }
    }
  };
  useEffect(() => {
    taskFetch();
  }, [user]);
  return (
    <div>
      <div>
        {error && (
          <div className="text-red-600 text-xl font-bold text-center">
            {error}
          </div>
        )}
      </div>
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3">
          {tasks.map((item, i) => (
            <div
              key={i}
              className="p-4 bg-white shadow-2xl rounded-xl m-4 text-center"
            >
              <div className="font-bold text-lg ">Task- {i + 1}</div>
              <div className="flex gap-4 text-center p-1 px-2">
                <span className="text-slate-900 font-bold">Assign By:</span>{" "}
                <span className="font-bold">{item.assignBy}</span>
              </div>
              <div className="flex gap-4 text-center p-1 px-2">
                <span className="text-slate-900 font-semibold">Title:</span>{" "}
                <span>{item.title}</span>
              </div>
              <div className="flex gap-4 text-center px-2 p-1">
                <span className="text-slate-900 font-semibold">
                  Description:
                </span>{" "}
                <span>{item.description}</span>
              </div>
              <div className="flex gap-4 text-center px-2 p-1">
                <span className="text-slate-900 font-semibold">Status:</span>{" "}
                <span>{item.status}</span>
              </div>
              <div className="flex gap-4 text-center px-2 p-1">
                <span className="text-slate-900 font-semibold">AssignTo:</span>{" "}
                <span>
                  {item.assingTo?.map((item) => (
                    <span className={`${user.username == item ? 'bg-yellow-500 px-1':''}`}>{item}, </span>
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Tasks;
