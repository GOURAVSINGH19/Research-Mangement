import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Messages = () => {
  const [data, setData] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8000/info/Uploader");
        setData(result.data);
        setMessages(result.data.map((message) => message.Notifications));
      } catch (e) {
        console.log(e, "error in fetchData");
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleRetry = async (id, MentorEmail) => {
    try {
      if (!MentorEmail) {
        throw new Error("Email is not available");
      }

      const response = await axios.post(
        `http://localhost:8000/info/SendRecheckMail/${id}`,
        { MentorEmail, data }
      );
      toast.success("Email sent successfully");
    } catch (error) {
      console.log("error in retry", error);
      toast.error("Failed to retry");
    }
  };

  const handleMarked = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/info/NotificationMarked/${id}`);
      const updatedMessages = messages.filter((msg) => msg._id !== id);
      setMessages(updatedMessages);
      toast.success("Message Marked successfully");
    } catch (error) {
      console.log("error in handleMarked", error);
      toast.error("Failed to Marked message");
    }
  };

  return (
    <div className="w-screen h-full flex justify-center items-center  top-[5rem] bg-[#000]">
      <div className="w-full p-[1rem] h-full bg-zinc-900 rounded-md overflow-y-auto">
        <div className="h-10 w-full mb-5">
          <h1 className="text-white text-[2rem] md:text-[3rem]">Messages</h1>
        </div>
        <div className="w-full h-full relative mt-16 flex flex-col items-center">
          {messages == "" ? (
            <div className="text-white w-full  text-3xl flex items-center justify-center h-[30rem]">
              No Notifications 😊
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className="w-full h-[8rem] md:w-[40rem] bg-white rounded-md mb-4"
              >
                <div className="px-[1rem] py-[1rem] flex-col sm:flex-row md:flex items-center ">
                  <div className="h-16 w-full flex items-center">
                    <h1 className="text-black text-[1rem] font-800 font-serif">
                      {msg.Notifications}
                    </h1>
                  </div>
                  <div className="flex items-center gap-5 sm:gap-4">
                    <button
                      className="text-white text-[1rem] bg-blue-400 px-3 py-2 rounded-md"
                      onClick={() => handleRetry(msg._id, msg.MentorEmail)}
                    >
                      Retry
                    </button>
                    <button
                      className="text-white text-[1rem] bg-gray-800 px-3 py-2 rounded-md"
                      onClick={() => handleMarked(msg._id)}
                    >
                      Marked
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
