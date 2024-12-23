import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Component/Home";
import Notfound from "../Component/Notfound";
import AddResearch from "../Component/AddResearch";
import Userprofile from "../Component/Userprofile/Userprofile";
import ResearchDetails from "../Component/AboutResearch/AboutResearch";
import Login from "../Component/Login/Login";
import Signup from "../Component/signup/Signup";
import ProtectedRouter from "../utils/Protectedrouter";
import Messages from "../Component/Message/Messages";
function Link() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRouter />}>
        <Route path="/user" element={<Userprofile />}>
          <Route path="/user/:id" element={<Userprofile />} />
        </Route>
        <Route path="/AddResearch" element={<AddResearch />}>
          <Route path="/AddResearch/:id" element={<AddResearch />} />
        </Route>
        <Route path="/viewresearch" element={<ResearchDetails />}>
          <Route path="/viewresearch/:id" element={<ResearchDetails />} />
        </Route>
        <Route path="/notificaiton" element={<Messages />}>
          <Route path="/notificaiton/:id" element={<Messages />}></Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Notfound />}></Route>
    </Routes>
  );
}

export default Link;
