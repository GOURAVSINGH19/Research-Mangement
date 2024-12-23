import React from "react";
import Link from "./Routers/Links";
import Navbar from "./Component/Navbar";

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-zinc-900 overflow-x-hidden">
      <Navbar />
      <Link />
    </div>
  );
};

export default App;
