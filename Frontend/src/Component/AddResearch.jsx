import React, { useContext, useState } from "react";
import Footer from "./Footer/Footer";
import { useForm } from "react-hook-form";
import img from "../assets/image.png";
import { fetchapi } from "./Contextapi/fetchapi";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

(axios.defaults.withCredentials = true),
  (axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

const AddResearch = () => {
  const [disabled, setdisabled] = useState(false);
  const navigate = useNavigate();
  const { data, setdata } = useContext(fetchapi);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      data,
    },
  });
  const handleChange = (e) => {
    e.preventDefault();
    setdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onsubmit = async () => {
    if (disabled) {
      data.ongoingproject = true;
    } else {
      data.ongoingproject = false;
    }
    if (data) {
      toast("User already exist");
    }
    try {
      const result = await axios.post(
        "http://localhost:8000/info/Uploaddata",
        data
      );
      toast("Uploaded");
      navigate("/user");
    } catch (e) {
      console.log(e, "error in upload");
    }
  };
  return (
    <div className="w-screen min-h-screen  bg-zinc-800  relative overflow-hidden">
      <div className=" w-full h-full p-[1rem] flex gap-5">
        <div className="lg:w-1/2  lg:block md:hidden bg-slate-50  hidden">
          <img src={img} alt="img" className="object-cover w-full min-h-full" />
        </div>
        <div className="lg:w-1/2  w-full relative mb-5">
          <form onSubmit={handleSubmit(onsubmit)} encType="multipart/form-data">
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between px-2">
              <div className="w-20 h-20 bg-black rounded-full flex justify-start mt-5"></div>
              <div className="md:w-[30vw] md:mr-5 mt-5">
                <h1 className="text-white text-xl mb-1">User Name</h1>
                <div>
                  <input
                    type="text"
                    placeholder="username.."
                    value={data.username}
                    className="md:w-full text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                    {...register("username", {
                      required: "username is required",
                      minLength: {
                        value: 3,
                        message: "username must be 3 characters or more",
                      },
                      pattern: {
                        message: "username must contain only letters",
                      },
                      onChange: handleChange,
                    })}
                  />
                </div>
                {errors.username && (
                  <>
                    <p style={{ color: "orangered" }}>
                      {errors.username.message}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col   lg:items-start   px-2 relative ">
              <div className="md:mr-5 mt-5  lg:w-[48vw]">
                <h1 className="text-white text-xl mb-1">email</h1>
                <div>
                  <input
                    type="email"
                    value={data.email}
                    placeholder="eample@gamil.com"
                    className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                    {...register("email", {
                      required: "email is required",
                      minLength: {
                        value: 3,
                        message: "email must be 3 characters or more",
                      },
                      onChange: handleChange,
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Username must contain only letters",
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
              </div>
              <div className="md:mr-5 mt-5 lg:w-[48vw]">
                <h1 className="text-white text-xl mb-1">phone No.</h1>
                <div>
                  <input
                    type="text"
                    placeholder="+91"
                    value={data.phone}
                    className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                    {...register("phone", {
                      required: "phone Number is required",
                      minLength: {
                        value: 8,
                        message: "phonenumber must be 10 Numbers",
                      },
                      onChange: handleChange,
                      pattern: {
                        message: "phonenumber is required",
                      },
                    })}
                  />
                </div>
                {errors.phone && (
                  <>
                    <p style={{ color: "orangered" }}>{errors.phone.message}</p>
                  </>
                )}
              </div>
              <div className="md:mr-5 mt-5 lg:w-[48vw]">
                <h1 className="text-white text-xl mb-1">Enrollment No.</h1>
                <div>
                  <input
                    type="number"
                    placeholder="10***"
                    value={data.enrollmentno}
                    className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                    {...register("enrollmentno", {
                      required: "Enrollment Number is required",
                      onChange: handleChange,
                      pattern: {
                        message: "Enrollment Number is required",
                      },
                    })}
                  />
                </div>
                {errors.enrollmentno && (
                  <>
                    <p style={{ color: "orangered" }}>
                      {errors.enrollmentno.message}
                    </p>
                  </>
                )}
              </div>
              <div className="md:mr-5 mt-5 lg:w-[48vw]">
                <h1 className="text-white text-xl mb-1">college</h1>
                <div>
                  <input
                    type="text"
                    placeholder="college"
                    value={data.college}
                    className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                    {...register("college", {
                      required: "college Name is required",
                      minLength: {
                        value: 8,
                        message: "college Name must be 8 characters or more",
                      },
                      onChange: handleChange,
                      pattern: {
                        message: "college is required",
                      },
                    })}
                  />
                </div>
                {errors.college && (
                  <>
                    <p style={{ color: "orangered" }}>
                      {errors.college.message}
                    </p>
                  </>
                )}
              </div>
              <div className="md:mr-5 mt-5 lg:w-[48vw]">
                <h1 className="text-white text-2xl mb-1">Batch</h1>
                <div className="sm:flex justify-between items-center ">
                  <div className="sm:w-[10rem] lg:w-40  mt-3 sm:ml-5">
                    <h1 className="text-white text-xl mb-1">Start</h1>
                    <div>
                      <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        value={data.BatchStart}
                        className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                        {...register("BatchStart", {
                          required: "Start Year is required",
                          onChange: handleChange,
                          pattern: {
                            message: "BatchStart is required",
                          },
                        })}
                      />
                      {errors.BatchStart && (
                        <>
                          <p style={{ color: "orangered" }}>
                            {errors.BatchStart.message}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="sm:w-[10rem] mt-2 lg:w-40 sm:mr-5">
                    <h1 className="text-white text-xl mb-1">End</h1>
                    <div>
                      <input
                        type="date"
                        placeholder="YYYY-MM-dd "
                        value={data.BatchEnd}
                        className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                        {...register("BatchEnd", {
                          required: "BatchEnd is required",
                          onChange: handleChange,
                          pattern: {
                            message: "BatchEnd is required",
                          },
                        })}
                      />
                      {errors.BatchEnd && (
                        <>
                          <p style={{ color: "orangered" }}>
                            {errors.BatchEnd.message}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:mr-5 mt-5 lg:w-[48vw]">
                <h1 className="text-white text-xl mb-1">department</h1>
                <div>
                  <select
                    type="text"
                    placeholder="department"
                    value={data.department}
                    className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                    {...register("department", {
                      required: "department is required",
                      onChange: handleChange,
                      pattern: {
                        message: "department is required",
                      },
                    })}
                  >
                    <option value="">Select department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">
                      Electrical Engineering
                    </option>
                  </select>
                </div>
                {errors.department && (
                  <>
                    <p style={{ color: "orangered" }}>
                      {errors.department.message}
                    </p>
                  </>
                )}
              </div>
              <div className="md:mb-5 mt-5 lg:w-[48vw] ">
                <h1 className="text-white text-xl mb-1">Faculty Name</h1>
                <div>
                  <input
                    type="text"
                    value={data.facultyname}
                    {...register("facultyname", {
                      required: "faculty Name is required",
                      min: 4,
                      pattern: {
                        message: "faculty Name is invalid",
                      },
                      onChange: handleChange,
                    })}
                    placeholder="Faculty Name..."
                    className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                  />
                </div>
                {errors.facultyname && (
                  <>
                    <p style={{ color: "orangered" }}>
                      {errors.facultyname.message}
                    </p>
                  </>
                )}
              </div>
              <div className="md:mb-5 mt-5 lg:w-[48vw] ">
                <h1 className="text-white text-xl mb-1">Mentor Email</h1>
                <div>
                  <input
                    type="text"
                    value={data.MentorEmail}
                    {...register("MentorEmail", {
                      required: "MentorEmail is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Username must contain only letters",
                      },
                      onChange: handleChange,
                    })}
                    placeholder="Email..."
                    className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                  />
                </div>
                {errors.MentorEmail && (
                  <>
                    <p style={{ color: "orangered" }}>
                      {errors.MentorEmail.message}
                    </p>
                  </>
                )}
              </div>
              <div className="md:mb-5 mt-5 lg:w-[48vw]">
                <h1 className="text-white text-xl mb-1">Research Title</h1>
                <div>
                  <input
                    type="text"
                    value={data.researchtitle}
                    {...register("researchtitle", {
                      required: "researchtitle is required",
                      min: 4,
                      pattern: {
                        message: "researchtitle is invalid",
                      },
                      onChange: handleChange,
                    })}
                    placeholder="Topic."
                    className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                  />
                </div>
                {errors.researchtitle && (
                  <p style={{ color: "orangered" }}>
                    {errors.researchtitle.message}
                  </p>
                )}
              </div>
              <div className="md:mb-5 mt-5 lg:w-[48vw]">
                <h1 className="text-white text-xl mb-1">projecturl</h1>
                <div>
                  <input
                    type="text"
                    value={data.projectUrl}
                    {...register("projectUrl", {
                      required: "projectUrl is required",
                      min: 4,
                      pattern: {
                        message: "projectUrl is invalid",
                      },
                      onChange: handleChange,
                    })}
                    placeholder="projectUrl."
                    className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                  />
                </div>
                {errors.projectUrl && (
                  <>
                    <p style={{ color: "orangered" }}>
                      {errors.projectUrl.message}
                    </p>
                  </>
                )}
              </div>
              <div className="md:mr-5 mt-5 lg:w-[48vw]">
                <h1 className="text-white text-2xl mb-1">Project Status</h1>
                <div className="sm:flex gap-32 justify-start items-center ">
                  <div className="sm:w-[10rem] lg:w-40 mt-3 sm:ml-5">
                    <h1 className="text-white text-xl mb-1">Start</h1>
                    <div>
                      <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        value={data.projectstart}
                        className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                        {...register("projectstart", {
                          required: "Startyear is required",
                          minLength: {
                            value: 8,
                            message: "Startyear must be 8 characters or more",
                          },
                          pattern: {
                            message: "Startyear is required",
                          },
                          onChange: handleChange,
                        })}
                      />
                    </div>
                    {errors.projectstart && (
                      <p style={{ color: "orangered" }}>
                        {errors.projectstart.message}
                      </p>
                    )}
                  </div>
                  <div className="sm:w-[10rem] md:w-full  lg:w-full mt-2 sm:mr-5">
                    <h1 className="text-white text-xl mb-1">End</h1>
                    <div className="sm:flex-row flex flex-col items-center justify-between gap-14">
                      <div className="w-full">
                        <input
                          type="date"
                          placeholder="YYYY-MM-dd"
                          value={data.projectend}
                          disabled={disabled}
                          className="text-lg py-2 px-3 w-full rounded-md  bg-zinc-900 text-white outline-none"
                          {...register("projectend", {
                            minLength: {
                              value: 8,
                              message: "endyear must be 8 characters or more",
                            },
                            pattern: {
                              message: "endyear is required",
                            },
                            onChange: handleChange,
                          })}
                        />
                        {errors.projectend && (
                          <>
                            <p style={{ color: "orangered" }}>
                              {errors.projectend.message}
                            </p>
                          </>
                        )}
                      </div>
                      <div className=" w-full flex items-center gap-10">
                        <h1 className="text-white text-xl mb-1">
                          Ongoing Project
                        </h1>
                        <div>
                          <div
                            value={data.ongoingproject}
                            onClick={() => setdisabled(!disabled)}
                            className={`text-lg w-2 h-2 p-2 rounded-full  text-white outline-none ${
                              disabled === true ? "bg-green-500" : "bg-red-500"
                            }`}
                            {...register("ongoingproject", {
                              pattern: {
                                message: "ongoingproject is required",
                              },
                              onChange: handleChange,
                            })}
                          ></div>
                        </div>
                      </div>
                      {errors.ongoingproject && (
                        <>
                          <p style={{ color: "orangered" }}>
                            {errors.ongoingproject.message}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:mb-5 mt-5 lg:w-[48vw]">
                <h1 className="text-white text-xl mb-1">
                  Research Description
                </h1>
                <textarea
                  type="text"
                  value={data.researchdescription}
                  rows={6}
                  {...register("researchdescription", {
                    required: "researchdescription is required",
                    min: 4,
                    pattern: {
                      message: "researchdescription is invalid",
                    },
                    onChange: handleChange,
                  })}
                  placeholder="researchdescription."
                  className="text-lg py-2 px-3 resize-none w-full rounded-md  bg-zinc-900 text-white outline-none"
                />
                {errors.researchdescription && (
                  <>
                    <p style={{ color: "orangered" }}>
                      {errors.researchdescription.message}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between items-center mt-5 ">
              <button
                type="submit"
                className="w-32 bg-blue-500 px-3 py-2 text-white rounded-md ml-5 capitalize"
              >
                {isSubmitting ? "Submitting..." : "submit"}
              </button>
              <button className="w-32 bg-red-500 px-3 py-2 text-white rounded-md mr-5 capitalize">
                reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddResearch;
