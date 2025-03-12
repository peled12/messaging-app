"use client";

import { FC, useState } from "react";

const CustomForm: FC<{ title: string }> = ({ title }) => {
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");

  const handeleSignUp = (e: React.FormEvent) => {};

  return (
    <div>
      <form className="flex flex-col gap-3 items-center p-4 auth-form">
        <h1 className="text-4xl">{title}</h1>
        <div className="inputs flex flex-col gap-12 mt-5 w-full">
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
          </div>
        </div>

        <button className="custom-btn submit-btn w-full">Submit</button>
      </form>
    </div>
  );
};

export default CustomForm;
