"use client";

import Link from "next/link";

import useUserData from "../customHooks/useUserData";
import axios, { AxiosResponse } from "axios";
import { SUCCESSFULL_REQUEST } from "../contants/httpStatusCodes";
import { useEffect, useState } from "react";

/*
  TODO: fix logout (might be related to redis not running or something)
*/

function AuthLink() {
  const { jwt, logout } = useUserData();

  const [loading, setloading] = useState<boolean>(true); // loading state for the html

  useEffect(() => {
    if (jwt !== undefined) setloading(false); // data is available, stop loading
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      const res: AxiosResponse<{ message: string }> = await axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) + "/auth/logout",
        {}, // no body is needed, just the token in the header
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      if (res.status === SUCCESSFULL_REQUEST) {
        logout(res.data.message);
      }
    } catch (err) {
      console.error(err);

      alert("Problem logging out :(");
    }
  };

  if (loading) return <div className="custom-spinner"></div>;

  return (
    <div className="flex gap-5">
      {jwt ? (
        <button
          className="text-foregroundhover text-lg ease-linear duration-300 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
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
      )}
    </div>
  );
}

export default AuthLink;
