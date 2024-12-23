import { createContext, useState } from "react";

export const fetchapi = createContext({});

const Apidata = ({ children }) => {
  const [data, setdata] = useState({
    username: "",
    email: "",
    phone: "",
    enrollmentno: "",
    college: "",
    department: "",
    BatchStart: "",
    BatchEnd: "",
    github: "",
    linkdin: "",
    facultyname: "",
    projectstart: "",
    projectend: "",
    ongoingproject:null,
    projectUrl: "",
    researchtitle: "",
    researchdescription: "",
    MentorEmail:""
  });


  return (
    <fetchapi.Provider value={{ data, setdata }}>{children}</fetchapi.Provider>
  );
};

export default Apidata;
