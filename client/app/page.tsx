import SearchBar from "./components/SearchBar";
import React from "react";

const Home = () => {
  return (
    <div className="flex mt-16 w-full justify-around">
      <div className="flex flex-col gap-3 items-center">
        <p className="text-xl">Search for existing users to message them!</p>
        <SearchBar />
      </div>
      <div className="flex flex-col gap-7 items-center mt-32">
        <h1 className="text-9xl max-w-4xl text-center">The Messaging App</h1>
        <h6 className="text-2xl">Feel free to message Anyone you'd like!</h6>
      </div>
    </div>
  );
};

export default Home;
