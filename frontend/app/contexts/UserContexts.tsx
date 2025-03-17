"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/user";
import { useRouter } from "next/navigation";

interface UserContextType {
  user: User | null;
  jwt: string | null;
  logout: (message?: string) => void;
  saveJwt: (jwtToken: string) => void;
  getJwt: () => string | null;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedJwt = localStorage.getItem("jwt");
    if (storedJwt) {
      try {
        const decodedUser: User = jwtDecode<User>(storedJwt);
        setUser(decodedUser);
        setJwt(storedJwt);
      } catch (error) {
        console.error("Invalid JWT:", error);
      }
    }
  }, []);

  // logs out
  const logout = (message?: string) => {
    setJwt(null);
    setUser(null);

    localStorage.removeItem("jwt"); // remove JWT from localStorage

    if (message) alert(message);

    router.push("/auth/login"); // go to login
  };

  // saves the JWT in localStorage
  const saveJwt = (jwtToken: string) => {
    if (!jwtToken) {
      console.error("JWT is missing");
      return;
    }
    localStorage.setItem("jwt", jwtToken);
    setJwt(jwtToken);

    try {
      setUser(jwtDecode<User>(jwtToken)); // decode the user and set in state
    } catch (error) {
      console.error("Error decoding JWT", error);
      setUser(null);
    }
  };

  // gets the JWT from localStorage
  const getJwt = () => {
    // if there is no JWT, navigate to the login page
    if (!jwt) router.push("/auth/login");

    return jwt;
  };

  return (
    <UserContext.Provider value={{ user, jwt, logout, saveJwt, getJwt }}>
      {children}
    </UserContext.Provider>
  );
};
