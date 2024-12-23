import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Researchdropdown, Researchdropdown2 } from "../Data/Data";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import bpit from "../assets/bpit.png";
import axios from "axios";
import noimg from "/noimg.jpg";
import { FiX } from "react-icons/fi";
import Messages from "./Message/Messages";

const useDebouncedValue = (inputValue, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const Navbar = () => {
  const navigate = useNavigate(null);
  const [Message, setMessages] = useState([]);
  const [search, setsearch] = useState("");
  const [Researchdropdownopen, setResearchdropdown] = useState(false);
  const [Researchdropdownopen2, setResearchdropdown2] = useState(false);
  const [sidemenu, setsidemenu] = useState(false);
  const searchref = useRef();
  const [user, setuser] = useState([]);
  const userAuth = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/info/logout");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const HandleResearchopen = () => {
    setResearchdropdown(!Researchdropdownopen);
    setResearchdropdown2(false);
  };

  const debounce = useDebouncedValue(search, 300);

  const getsearch = async () => {
    try {
      const response = await axios.get("http://localhost:8000/info/Uploader");
      console.log(response.data);
      const filteredUsers = response.data.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.researchtitle.toLowerCase().includes(search.toLowerCase())
      );
      setuser(filteredUsers);
      setMessages(response.data.map((message) => message.Notifications));
    } catch (err) {
      console.log("Error in searching ", err);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    getsearch();
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [debounce]);

  const HandleSearchChange = (e) => {
    let result = e.target.value;
    setsearch(result);
    getsearch();
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown")) {
      setResearchdropdown(false);
      setResearchdropdown2(false);
      setsidemenu(false);
    }
  };

  return (
    <div className="w-screen bg-white px-6 py-4">
      <div className="h-15 flex justify-between items-center text-black capitalize">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link to="/">
            <img src={bpit} alt="bpit" className="hidden sm:block w-20" />
          </Link>
          {sidemenu && (
            <div className="absolute top-14 left-0 z-40 w-full bg-gray-100 shadow-lg md:hidden">
              <div className="px-4 py-4 ">
                <div className="relative mb-4  font-serif">
                  <Link to="/">
                    <h1 className="font-serif text-xl cursor-pointer">Home</h1>
                  </Link>
                </div>
                <div className="relative mb-4 dropdown">
                  <h1
                    className="font-serif text-xl cursor-pointer"
                    onClick={HandleResearchopen}
                  >
                    Research
                  </h1>
                  {Researchdropdownopen && (
                    <div className="absolute top-8 z-50  left-0 bg-gray-200 rounded-md w-full">
                      <ul className="py-2 px-4">
                        {Researchdropdown.map((item) => (
                          <li key={item.id} className="mt-2">
                            <Link to={item.to}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* <div className="relative mb-4 dropdown font-serif">
                  <h1
                    className="font-serif text-xl cursor-pointer"
                    onClick={HandleResearchopen2}
                  >
                    Publications
                  </h1>
                  {Researchdropdownopen2 && (
                    <div className="absolute top-8 left-0 z-10 bg-gray-200 rounded-md w-full">
                      <ul className="py-2 px-4">
                        {Researchdropdown2.map((item) => (
                          <li key={item.id} className="mt-2">
                            <Link to={item.to}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div> */}
                <div className="flex flex-col relative mb-4 dropdown font-serif gap-2 md:gap-10 w-[50%] justify-end ">
                  <div>
                    <Link to="/notificaiton">
                      <span className="relative font-serif text-xl cursor-pointer bg-purple-400">
                        <h1>Message</h1>
                        {Message.length > 1 ? (
                          <span className=" -top-2 -right-1 bg-zinc-400 text-white absolute w-3 flex items-center justify-center  h-3  rounded-full "></span>
                        ) : null}
                      </span>
                    </Link>
                  </div>
                  <Link to="/user">
                    <h1 className="font-serif text-xl cursor-pointer">
                      Profile
                    </h1>
                  </Link>
                  {userAuth ? (
                    <h1
                      className="font-serif text-xl cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </h1>
                  ) : (
                    <Link to="/login">
                      <h1 className="font-serif text-xl cursor-pointer">
                        Login
                      </h1>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className=" flex gap-20 items-center font-mono text-sm">
          <div className="hidden md:flex relative dropdown">
            <h1
              className="font-serif text-xl cursor-pointer"
              onClick={HandleResearchopen}
            >
              Research
            </h1>
            {Researchdropdownopen && (
              <div className="absolute top-10 left-0 z-10 bg-gray-200 rounded-md w-52">
                <ul className="py-2 px-4">
                  {Researchdropdown.map((item) => (
                    <li key={item.id} className="mt-2">
                      <Link to={item.to}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* <div className="hidden lg:flex relative dropdown">
            <h1
              className="font-serif text-xl cursor-pointer"
              onClick={HandleResearchopen2}
            >
              Publications
            </h1>
            {Researchdropdownopen2 && (
              <div className="absolute top-10 left-0 z-10 bg-gray-200 rounded-md w-52">
                <ul className="py-2 px-4">
                  {Researchdropdown2.map((item) => (
                    <li key={item.id} className="mt-2">
                      <Link to={item.to}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}

          <div className="relative md:w-full w-[50vw]">
            {search.length > 0 ? (
              <span
                className="absolute top-2 right-2 text-gray-500 cursor-pointer text-xl "
                onClick={() => setsearch("")}
              >
                <FiX />
              </span>
            ) : (
              <span
                className="absolute top-2 right-2 text-gray-500 cursor-pointer text-xl "
                onClick={() => searchref.current.focus()}
              >
                <FiSearch />
              </span>
            )}
            <input
              id="search"
              type="text"
              placeholder="Search"
              value={search}
              onChange={HandleSearchChange}
              ref={searchref}
              className="px-3 py-2  text-md bg-gray-300 rounded-md outline-none w-full lg:w-96 md:w-64"
            />
          </div>
          {search.length > 0 && (
            <div className="absolute w-[25vw] h-[40vh]  text-white top-[8%] right-[28%] bg-[#41404094] rounded-md overflow-y-scroll z-20 p-[1rem]">
              {user.length > 0 ? (
                user.map((item, i) => (
                  <Link
                    to={`/viewresearch/${item._id}`}
                    key={i}
                    onClick={() => setsearch("")}
                    className=" w-[100%] p-5 flex justify-start items-center rounded-sm border-zinc-100   hover:bg-pink-500  duration-500"
                  >
                    <img
                      className="h-[5vh] rounded-full object-cover mr-5"
                      src={noimg}
                      alt="img"
                    />
                    <span className="ml-5">
                      {item.username || item.researchtitle}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="flex justify-center items-center text-2xl text-white">
                  NO User
                </p>
              )}
            </div>
          )}
          <span className="md:hidden  text-xl text-black ml-4 ">
            <RxHamburgerMenu
              onClick={() => setsidemenu(!sidemenu)}
              className="cursor-pointer dropdown"
            />
          </span>
        </div>

        <div className="hidden md:flex gap-20 items-center">
          <div>
            <Link to="/notificaiton">
              <span className="relative cursor-pointer flex ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 18"
                  width="4em"
                  height="4em"
                  fill="currentColor"
                  className="h-[26px] w-[26px] font-100 hover:text-text-primary dark:hover:text-text-primary text-text-secondary dark:text-text-secondary"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.19 1.564a.75.75 0 01.729.069c2.137 1.475 3.373 3.558 3.981 5.002l.641-.663a.75.75 0 011.17.115c1.633 2.536 1.659 5.537.391 7.725-1.322 2.282-3.915 2.688-5.119 2.688-1.177 0-3.679-.203-5.12-2.688-.623-1.076-.951-2.29-.842-3.528.109-1.245.656-2.463 1.697-3.54.646-.67 1.129-1.592 1.468-2.492.337-.895.51-1.709.564-2.105a.75.75 0 01.44-.583zm.784 2.023c-.1.368-.226.773-.385 1.193-.375.997-.947 2.13-1.792 3.005-.821.851-1.205 1.754-1.282 2.63-.078.884.153 1.792.647 2.645C6.176 14.81 7.925 15 8.983 15c1.03 0 2.909-.366 3.822-1.94.839-1.449.97-3.446.11-5.315l-.785.812a.75.75 0 01-1.268-.345c-.192-.794-1.04-2.948-2.888-4.625z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {Message.length > 1 ? (
                  <span className=" -top-2 -right-1 bg-zinc-400 text-white absolute w-3 flex items-center justify-center  h-3  rounded-full "></span>
                ) : null}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-10">
            <Link to="/user">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                Profile
              </button>
            </Link>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
              {userAuth ? (
                <h1 onClick={handleLogout}>Logout</h1>
              ) : (
                <Link to="/login">
                  <h1>Login</h1>
                </Link>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
