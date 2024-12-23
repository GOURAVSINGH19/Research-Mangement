import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import axios from "axios";
import img from "../../assets/largepreview.png";
import userimg from "../../assets/image.png";

const Userprofile = () => {
  const [users, setUsers] = useState([]);
  const [pastitem, setPastitems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/info/Verified-user`
        );
        const data = response.data;
        const ongoingUsers = data.filter(
          (user) => user.ongoingproject === true
        );
        setUsers(ongoingUsers);
        const pastUsers = data.filter((user) => user.ongoingproject === false);
        setPastitems(pastUsers);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removecard = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/info/Uploader/${itemId}`
      );
      const data = response.data;
      if (data.success) {
        if (data.ongoingproject) {
          setUsers(users.filter((item) => item._id !== itemId));
        } else {
          const updatedPastData = pastitem.filter(
            (item) => item._id !== itemId
          );
          setPastitems(updatedPastData);
        }
        setLoading(false);
      } else {
        console.error("Error deleting card:", data.error);
        setError(data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error removing card:", error);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-white">Error: {error.message}</p>;
  return (
    <div className="w-screen h-screen md:overflow-x-hidden font-serif text-white">
      <div className=" min-h-full  bg-zinc-900 p-[.5rem] sm:p-[1rem]">
        <div className="w-full">
          <div className=" w-full flex gap-5 items-center">
            <div className="w-20">
              <div className="w-16 h-16 rounded-full bg-zinc-500">
                <Link to="/user">
                  <img
                    src={userimg}
                    alt="user-img"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </Link>
              </div>
            </div>
            <div className="w-full  min-h-fit">
              {users.map((item, id) => (
                <div key={id}>
                  <h2 className=" text-2xl font-semibold capitalize">
                    {item.username}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">{item.college}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-zinc-600 mt-5"></div>
        <div className="w-full min-h-screen mt-5 overflow-hidden">
          <div className="w-full h-full  mb-4">
            <h1 className="text-[2rem] lg:text-[3vw] text-zinc-600 capitalize font-serif">
              Ongoing Work
            </h1>
            <div className=" w-full min-h-[25rem] lg:min-h-[30rem]  mt-4 overflow-hidden relative  py-2 px-2">
              <div className="w-full flex gap-3  overflow-scroll">
                {users.map((item, i) => (
                  <div key={i} className=" h-full">
                    <div className="w-80 min-h-full p-[1.5rem] md:p-0 md:w-96 md:h-[29rem]  bg-[#0005]  backdrop-blur-[20px] relative rounded-md">
                      <div className="min-w-full h-12 flex items-center justify-between px-[.5rem] py-[.2rem] md:px-[.8rem] md:py-[1rem]">
                        <div className="">
                          <Link to="/user">
                            <img
                              src={userimg}
                              alt="user"
                              className="w-10 h-10 rounded-full"
                            />
                          </Link>
                        </div>
                        <span className="mr-2 text-xl">
                          <h1>{item.username}</h1>
                        </span>
                      </div>

                      <div className="min-w-full ">
                        <div className="h-full w-full sm:w-full p-[.5rem] flex justify-center  rounded-lg">
                          <Link to={item.projectUrl}>
                            <img
                              src={img}
                              alt="img"
                              className="object-cover md:h-[20rem]"
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="w-full mt-4 ">
                        <div className="px-3 flex justify-between">
                          <Link to={`/AddResearch/${item._id}`}>
                            <button className="bg-blue-500 px-3 py-2 rounded-md w-[5rem]">
                              Edit
                            </button>
                          </Link>
                          <button
                            className="bg-red-400 px-3 py-2 rounded-md w-[6rem]"
                            onClick={() => {
                              removecard(item._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-zinc-800 mt-5"></div>
          <div className="w-full h-full  mt-8 overflow-hidden">
            <h1 className="text-[2rem] lg:text-[3vw] text-zinc-600 capitalize font-serif">
              Past Work
            </h1>
            <div className=" w-full min-h-[25rem] lg:h-[30rem] flex mt-4 overflow-hidden relative  py-2 px-2">
              <div className="w-full flex gap-3 md:gap-2 overflow-scroll">
                {pastitem.map((item, i) => (
                  <div key={i} className="h-full">
                    <div className="w-96 h-[35rem] p-[.5rem] md:w-96 md:h-[29rem]  bg-[#0005]  backdrop-blur-[20px] relative rounded-md">
                      <div className="min-w-full h-12 flex items-center justify-between px-[.5rem] py-[.2rem] md:px-[.8rem] md:py-[1rem]">
                        <div className="">
                          <Link to="/user">
                            <img
                              src={userimg}
                              alt="user-img"
                              className="w-10 h-10 rounded-full"
                            />
                          </Link>
                        </div>
                        <span className="mr-2 text-xl">
                          <h1>{item.username}</h1>
                        </span>
                      </div>

                      <div className="min-w-full ">
                        <div className="w-full p-[.5rem] flex justify-center items-center h-[26rem] sm:h-full  rounded-lg">
                          <Link to={item.projectUrl}>
                            <img
                              src={img}
                              alt="img"
                              className="object-cover h-96 md:h-[20rem]"
                            />
                          </Link>
                        </div>
                      </div>

                      <div className="w-full mt-4 ">
                        <div className="px-3 flex justify-between">
                          <Link to={`/AddResearch/${item._id}`}>
                            <button className="bg-blue-600 px-3 py-2 rounded-md w-[5rem]">
                              Edit
                            </button>
                          </Link>
                          <button
                            className="bg-red-400 px-3 py-2 rounded-md w-[6rem]"
                            onClick={() => removecard(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Userprofile;
