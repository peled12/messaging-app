import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <div className="h-16 w-full navbar">
      <SearchBar classname="absolute left-4" />
      <div className="flex gap-5">
        <Link
          href={"/auth/signup"}
          className="text-foregroundhover text-lg ease-linear duration-300"
        >
          Sign up
        </Link>
        <Link href={"/auth/login"} className="text-foregroundhover text-lg">
          Login
        </Link>
      </div>
      <p className="absolute right-36 text-xl">Welcome!</p>
    </div>
  );
};

export default NavBar;
