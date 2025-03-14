"use client";

import useUserData from "../customHooks/useUserData";

function Greet() {
  const { user } = useUserData();

  return (
    <p className="absolute right-36 text-xl">
      Welcome{user && ` ${user.username}`}!
    </p>
  );
}

export default Greet;
