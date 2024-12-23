import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import axios from "axios";

const Userprofile = () => {
  const [user, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/info/Uploader/${id}`
        );
        setusers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p className="text-white text-3xl capitalize flex justify-center items-center">
        Error: {error.message}
      </p>
    );

  return (
    <div className="w-screen h-screen overflow-x-hidden text-white">
      <div className="w-full h-screen bg-zinc-900  overflow-hidden">
        <div className="w-full pl-[1rem]">
          <div className=" w-full flex gap-5 items-center">
            <div className="w-64 p-[1rem]">
              <img
                className="w-20 h-20 rounded-full"
                src="https://plus.unsplash.com/premium_vector-1719858610096-bba4498e5fc1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
            </div>
            <div className="w-fit">
              <h2 className=" text-2xl font-semibold">
                {user.username ? user.username : "User Name"}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {user.college ? user.college : "college Name"}
              </p>
            </div>
            <div className="w-full flex gap-10 ml-5">
              <h1 className="flex flex-col text-[1.5vw] capitalize">
                faculty Name
                <li className="text-[1vw]">{user.facultyname}</li>
              </h1>
              <h1 className="text-[1.5vw] flex flex-col">
                Phone Number
                <span className="text-[1vw]">91+ {user.phone}</span>
              </h1>
              <h1 className="text-[1.5vw] flex flex-col">
                 User Email 
                <span className="text-[1vw]">{user.email}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full p-4 flex flex-col overflow-scroll">
          <div className="text-white text-[2vw]">
            <h1 className="text-[1.5vw] text-zinc-400">Title</h1>
            <h2>{user.researchtitle}</h2>
          </div>
          <div className="w-full h-full  mt-10">
            <h2 className=" text-[1.5vw] text-zinc-400 ">ABOUT RESEARCH</h2>
            <div className="h-[60vh] bg-zinc-800 text-white">
              {user.researchdescription}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Userprofile;
