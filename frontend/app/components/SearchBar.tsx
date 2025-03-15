"use client";

import { FC, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import useUserData from "../customHooks/useUserData";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { User } from "../types/user";
import {
  endAniFail,
  endAniSuccess,
  startAni,
} from "../functions/loaderHandler";

import {
  UNAUTHORIZED_ERROR,
  NOT_FOUND_ERROR,
} from "../contants/httpStatusCodes";

/*
  TODO: handle prefetching
*/

const SearchBar: FC<{ classname?: string; placeHolder?: string }> = ({
  classname,
  placeHolder,
}) => {
  const [value, setvalue] = useState<string>("");

  const { getJwt, user } = useUserData();

  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // if enter was clicked, search for a user
    if (e.key === "Enter") {
      handleSearchUser();
    }
  };

  const handleSearchUser = (): void => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return; // ensure a value was inserted

    const jwt: string = getJwt()!; // this also handles case when user is not signed in

    const loader: HTMLDivElement = document.querySelector(".custom-loader")!;
    startAni(loader);

    axios
      .get(
        (process.env.NEXT_PUBLIC_API_URL as string) +
          "/users/username/" +
          trimmedValue,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then(async (res) => {
        const foundUser: User = res.data;

        if (foundUser.id === user?.id) {
          alert("You cannot message yourself 😂");
          await endAniFail(loader); // act like an error
          return;
        }

        // successful request

        await endAniSuccess(loader);

        router.push("/messages/" + foundUser.id);
      })
      .catch(async (err: AxiosError) => {
        // unsuccessful request

        await endAniFail(loader);

        if (err.response) {
          if (err.response.status === NOT_FOUND_ERROR) {
            alert("Couldn't find the user your'e looking for");
          }

          if (err.response.status === UNAUTHORIZED_ERROR) {
            alert("Your'e session has expired. Please login again");
            router.push("/auth/login");
          }
        }
      });
  };

  return (
    <div className={`${classname} flex items-center`}>
      <input
        type="text"
        className="custom-search-bar outline-0 text-background rounded-sm pr-1 pl-2 mr-2.5 py-0.5 placeholder:text-sm"
        maxLength={20}
        placeholder={placeHolder}
        onKeyDown={handleKeyDown}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setvalue(e.currentTarget.value)
        }
      />
      <MdOutlineSearch
        className="text-white w-7 h-7 cursor-pointer text-foregroundhover ease-linear duration-300"
        onClick={handleSearchUser}
      />
    </div>
  );
};

export default SearchBar;
