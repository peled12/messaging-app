import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import Greet from "./Greet";

const NavBar = () => {
  return (
    <div className="h-16 w-full navbar">
      <SearchBar classname="absolute left-4" placeHolder="Message someone!" />
      <div className="flex gap-5">
        <Link
          href={"/auth/signup"}
          className="text-foregroundhover text-lg ease-linear duration-300"
        >
          Sign up
        </Link>
        <Link
          href={"/auth/login"}
          className="text-foregroundhover text-lg ease-linear duration-300"
        >
          Login
        </Link>
      </div>
      <Greet />
    </div>
  );
};

export default NavBar;
