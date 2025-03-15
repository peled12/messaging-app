import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import Greet from "./Greet";
import AuthLink from "./AuthLink";

const NavBar = () => {
  return (
    <div className="h-16 w-full navbar">
      <SearchBar classname="absolute left-4" placeHolder="Message someone!" />
      <AuthLink />
      <Greet />
    </div>
  );
};

export default NavBar;
