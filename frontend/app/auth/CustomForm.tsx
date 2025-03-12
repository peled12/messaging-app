"use client";
import axios, { AxiosResponse } from "axios";

import { FC, useState } from "react";
import {
  endAniFail,
  endAniSuccess,
  startAni,
} from "../functions/loaderHandler";
import { useRouter } from "next/navigation";

// TODO: handle jwt

const CustomForm: FC<{ title: "Sign Up" | "Login" }> = ({ title }) => {
  const [password, setpassword] = useState<string>("");
  const [username, setusername] = useState<string>("");

  const [usernameError, setusernameError] = useState<boolean>(false);
  const [passwordError, setpasswordError] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent): void => {
    // reset the error flags
    setpasswordError(false);
    setusernameError(false);

    // call the corresponding function
    title === "Sign Up" ? handleSignUp(e) : handleLogin(e);
  };

  const handleSignUp = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    let isError: boolean = false; // init the error flag

    // ensure valid username
    if (username.length < 4 || username.length > 16) {
      setusernameError(true);
      isError = true;
    }

    // ensure valid password
    if (password.length < 6 || !/[A-Z]/.test(password)) {
      setpasswordError(true);
      isError = true;
    }

    // return if the credentials are invalid
    if (isError) return;

    // start the animation
    const loader: HTMLDivElement = document.querySelector(".custom-loader")!;
    startAni(loader);

    // make the signup request
    try {
      const res: AxiosResponse = await axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) + "/auth/signup",
        {
          username: username,
          password: password,
        }
      );

      console.log(res.data);

      // successful request
      await endAniSuccess(loader);

      router.replace("/"); // navigate to home page
    } catch (error) {
      // unsuccessful request
      endAniFail(loader);

      if (axios.isAxiosError(error)) {
        // if the error has a response

        if (error.response?.data.message === "Username is already taken") {
          alert("Username is already taken. Please enter a different username");
        }
      }

      console.error(error);
    }
  };

  const handleLogin = async (e: React.FormEvent): Promise<void> => {};

  return (
    <div className="mt-[10vh]">
      <form
        className="flex flex-col gap-3 items-center p-4 auth-form"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl">{title}</h1>
        <div className="inputs flex flex-col gap-5 mt-5 w-full">
          <div>
            <h2 className="text-xl mb-2">Username</h2>
            <input
              type="text"
              placeholder="Enter username here"
              name="username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setusername(e.target.value)
              }
            />
            <p
              className={`${
                usernameError ? "opacity-100" : "opacity-0"
              } ease-linear duration-300 mt-0.5 text-red-500`}
            >
              Username must contain 4-16 characters
            </p>
          </div>
          <div>
            <h2 className="text-xl mb-2">Password</h2>
            <input
              type="password"
              placeholder="Enter password here"
              name="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setpassword(e.target.value)
              }
            />
            <p
              className={`${
                passwordError ? "opacity-100" : "opacity-0"
              } ease-linear duration-300 mt-0.5 text-red-500`}
            >
              Password must contain more than 6 characters and a capital letter
            </p>
          </div>
        </div>
        <button className="custom-btn submit-btn w-full">Submit</button>
      </form>
    </div>
  );
};

export default CustomForm;
