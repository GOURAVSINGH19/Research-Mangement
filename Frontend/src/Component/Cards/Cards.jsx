import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import video from "../../assets/7btrrd.mp4";
import Dropdown from "../Dropdown/Dropdown";
import axios from "axios";
import defaultimg from "../../assets/largepreview.png";
import img from "../../assets/image.png";

const Cards = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/info/Verified-user"
        );
        setItems(response.data);
        setFilteredItems(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterItems = () => {
      if (category === "ALL") {
        setFilteredItems(items);
      } else if (category === "ONGOING") {
        setFilteredItems(items.filter((item) => item.ongoingproject === true));
      } else if (category === "PAST") {
        setFilteredItems(items.filter((item) => item.ongoingproject === false));
      }
    };

    filterItems();
  }, [category, items]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-white">Error: {error.message}</p>;

  return (
    <div className="w-full h-full relative">
      <div className="w-[100%] relative bg-zinc-900">
        <video
          src={video}
          className="object-cover w-screen min-h-screen"
          muted
          loop
          autoPlay
        />
      </div>
      <div className="w-full h-full absolute top-0 bg-[rgba(16 18 27 / 40%)] backdrop-blur-[20px] overflow-hidden">
        <div className="md:max-w-screen-2xl py-2 px-4 mx-auto flex justify-between items-center">
          <span className="text-2xl font-serif">
            <h1>Topic</h1>
          </span>
          <span>
            <Dropdown
              title="Category"
              options={["ALL" , "ONGOING", "PAST"]}
              func={(e) => setCategory(e.target.value)}
            />
          </span>
        </div>
        <div className="w-full min-h-screen md:h-full flex mt-4 overflow-hidden relative py-2 px-2">
          {filteredItems.length > 0 ? (
            <div className="w-full flex gap-3 md:gap-2 overflow-scroll">
              {filteredItems.map((item, i) => (
                <div key={i} className="w-fit h-fit">
                  <div className="w-80 h-[22rem] md:w-96 md:h-[29rem] bg-[#0005] backdrop-blur-[20px] relative rounded-md">
                    <div className="h-12 flex items-center justify-between px-[.5rem] py-[.2rem] md:px-[.8rem] md:py-[1rem]">
                      <div className="">
                        <Link to="/user">
                          <img
                            src={img}
                            alt="user-img"
                            className="w-10 h-10 rounded-full"
                          />
                        </Link>
                      </div>
                      <span className="mr-2 text-xl">
                        <h1>{item.username}</h1>
                      </span>
                    </div>

                    <div className="min-w-full">
                      <div className="w-full p-[.5rem] flex justify-center rounded-lg">
                        <Link to={item.projectUrl}>
                          <img
                            src={defaultimg}
                            alt="img"
                            className="object-cover md:h-[20rem]"
                          />
                        </Link>
                      </div>
                    </div>

                    <div className="w-full mt-4">
                      <div className="px-3 flex justify-between">
                        <Link to={`/viewresearch/${item._id}`}>
                          <button className="bg-blue-500 px-3 py-2 rounded-md">
                            Profile
                          </button>
                        </Link>
                        <Link to={`/user/${item._id}`}>
                          <button className="bg-purple-400 px-3 py-2 rounded-md">
                            View More
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-[2rem] w-full h-[20vw] flex justify-center items-center">
              No data
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
