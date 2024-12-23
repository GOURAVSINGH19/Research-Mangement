import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
const signup = () => {
  const navigate = useNavigate();

  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      confirmPassword: "",
    },
  });

  const handleChange = (e) => {
    setdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onsubmit = async (e) => {
    const { firstname, lastname, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/info/signup", {
        email,
        firstname,
        lastname,
        password,
      });
      console.log(response.data);
      setdata({});
      toast("User registered successfully");
      navigate("/login");
    } catch (err) {
      console.log("error in signup", err);
    }
  };

  return (
    <div className="w-screen h-screen p-[1rem]">
      <div className="h-[100%] bg-zinc-800  mx-auto relative p-[1rem] flex rounded-lg gap-5 ">
        <div className='md:block md:w-3/4 hidden sm:hidden relative text-zinc-700 h-[100%] bg-white bg-[url("https://images.unsplash.com/photo-1722603264833-fde4f1f8a7ec?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D")] bg-center bg-cover bg-no-repeat rounded-md object-cover'>
          <div className=" flex items-center w-[100%] justify-between px-10 py-5 h-20">
            <h1 className="text-2xl capitalize font-bold ">text</h1>
            <Link to="/">
              <button className="capitalize bg-[#ffffff38]  px-3 py-2 rounded-md text-[15px] ">
                back to website →
              </button>
            </Link>
          </div>
          <div className="absolute bottom-[3.5vw] lg:left-[10vw] md:left-[5vw] ">
            <h2 className="text-[3rem]  text-white font-serif">
              Creating Models
            </h2>
            <div className="flex gap-10 justify-center">
              <div className="w-16 rounded-md h-[5px] bg-white"></div>
              <div className="w-16 rounded-md h-[5px] bg-white"></div>
              <div className="w-16 rounded-md h-[5px] bg-white"></div>
            </div>
          </div>
        </div>
        <div className="md:w-3/4 relative w-full  h-[100%] text-white ">
          <div className="w-full  h-full flex flex-col justify-center items-center ">
            <div className=" w-full relative h-[10%] flex flex-col justify-end mb-[3vw]">
              <div className="flex items-center justify-center gap-5 mb-5">
                <h1 className="text-[4vw] mb-3">Create an account</h1>
              </div>
              <p className="text-lg absolute left-[18%] bottom-0 font-serif">
                Already have an a account?
                <span className="text-purple-400 text-xl ml-3 border-b-2 border-white">
                  <Link to="/login">login</Link>
                </span>
              </p>
            </div>
            <div className="w-full flex  justify-center      relative">
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="flex gap-5">
                  <div className="w-96 flex flex-col mb-5">
                    <span className="text-2xl mb-1">First Name</span>
                    <input
                      className="px-3 py-3 bg-[#0000001a] text-white outline-none"
                      placeholder="firstname"
                      value={data.firstname}
                      {...register("firstname", {
                        required: "firstname is required",
                        type: "text",
                        minLength: {
                          value: 3,
                          message:
                            "First name must be at least 3 characters long",
                        },
                        onChange: handleChange,
                        pattern: {
                          message: "firstname is required",
                        },
                      })}
                    />
                    {errors.email && (
                      <>
                        <p style={{ color: "orangered" }}>
                          {errors.firstname.message}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="w-96 flex flex-col mb-5">
                    <span className="text-2xl mb-1">Last Name</span>
                    <input
                      className="px-3 py-3 bg-[#0000001a] text-white outline-none"
                      placeholder="Lastname"
                      value={data.lastname}
                      {...register("lastname", {
                        required: "lastname is required",
                        type: "text",
                        onChange: handleChange,
                        minLength: {
                          value: 3,
                          message:
                            "Last name must be at least 3 characters long",
                        },
                        pattern: {
                          message: "lastname is required",
                        },
                      })}
                    />
                    {errors.email && (
                      <>
                        <p style={{ color: "orangered" }}>
                          {errors.lastname.message}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col  mb-5">
                  <span className="text-2xl mb-1">Email</span>
                  <input
                    id="email"
                    className="px-3 py-3 bg-[#0000001a] text-white outline-none"
                    placeholder="Email"
                    value={data.email}
                    {...register("email", {
                      required: "Email is required",
                      type: "email",
                      onChange: handleChange,
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <>
                      <p style={{ color: "orangered" }}>
                        {errors.email.message}
                      </p>
                    </>
                  )}
                </div>
                <div className="w-full mb-5 flex flex-col">
                  <span className="text-2xl mb-1">Password</span>
                  <input
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    className="px-3 py-3 bg-[#0000001a] text-white outline-none"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                      onChange: handleChange,
                      pattern: {
                        message: "Password is Incorrect",
                      },
                    })}
                  />
                  {errors.password && (
                    <>
                      <p style={{ color: "orangered" }}>
                        {errors.password.message}
                      </p>
                    </>
                  )}
                </div>
                <div className="w-full mb-5 flex flex-col">
                  <span className="text-2xl mb-1">Confirm Password</span>
                  <input
                    type="password"
                    placeholder="confirmPassword"
                    value={data.confirmPassword}
                    className="px-3 py-3 bg-[#0000001a] text-white outline-none"
                    {...register("confirmPassword", {
                      required: "confirmPassword is required",
                      minLength: {
                        value: 8,
                        message:
                          "confirmPassword must be at least 8 characters long",
                      },
                      onChange: handleChange,
                      pattern: {
                        message: "confirm Password is Incorrect",
                      },
                    })}
                  />
                  {errors.confirmPassword && (
                    <>
                      <p style={{ color: "orangered" }}>
                        {errors.confirmPassword.message}
                      </p>
                    </>
                  )}
                </div>
                <button
                  className="bg-purple-400 px-3 py-2 text-white w-full  rounded-md flex justify-center"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
            <p className="text-lg mb-5 text-center mt-5 flex items-center justify-center gap-5 w-full ">
              <div className="w-28 h-[1px] bg-white"></div>
              <p className="">or register with</p>
              <div className="w-28 h-[1px] bg-white"></div>
            </p>
            <div className="mt-5 flex items-center gap-12">
              <button className="w-40 flex border-2 gap-5 border-zinc-600 py-4 px-3 items-center rounded-md">
                <FaGoogle className="text-2xl" />
                <span className="ml-3 capitalize font-serif text-xl">
                  Google
                </span>
              </button>
              <button className="w-40 flex border-2 gap-5 border-zinc-600 py-4 px-3 items-center rounded-md">
                <FaGithub className="text-2xl" />
                <span className="ml-3 capitalize font-serif text-xl">
                  Github
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
