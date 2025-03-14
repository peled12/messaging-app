import SearchBar from "./components/SearchBar";
import React from "react";

const Home = () => {
  return (
    <div className="flex w-full justify-center gap-[12vw] mb-12">
      <div className="flex flex-col gap-3 items-center mt-32">
        <p className="text-xl">Search for existing users to message them!</p>
        <SearchBar placeHolder="e.g. Peled" />
      </div>
      <div className="flex flex-col gap-7 items-center max-w-[50vw] relative top-[50vh] translate-y-[calc(-50%-60px)]">
        <h1 className="text-9xl max-w-4xl text-center">The Messaging App</h1>
        <h6 className="text-2xl">Feel free to message Anyone you'd like!</h6>
      </div>
    </div>
  );
};

export default Home;
