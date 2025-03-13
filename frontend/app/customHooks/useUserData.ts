import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/user";
import { useRouter } from "next/navigation";

// define the types for the returned hook
interface UseUserData {
  saveJwt: (jwtToken: string) => void;
  getJwt: () => string | null;
  user: User | null;
  jwt: string | null;
}

const useUserData = (): UseUserData => {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);

  const router = useRouter();

  // saves the JWT in localStorage
  const saveJwt = (jwtToken: string) => {
    if (!jwtToken) {
      console.error("JWT is missing");
      return;
    }

    // save the JWT to localStorage
    localStorage.setItem("jwt", jwtToken);

    // update the state with the new JWT
    setJwt(jwtToken);

    // decode the user data and set it
    const decodedUser: User | null = decodeJwt(jwtToken);
    setUser(decodedUser);
  };

  // decodes JWT and extracts user data
  const decodeJwt = (token: string): User | null => {
    try {
      const decoded = jwtDecode<User>(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding JWT", error);
      return null;
    }
  };

  // gets the JWT from localStorage
  const getJwt = () => {
    const storedJwt = localStorage.getItem("jwt");

    // if there is no JWT, navigate to the login page
    if (!storedJwt) router.push("/auth/login");

    setJwt(storedJwt);
    return storedJwt;
  };

  // load the JWT from localStorage when the component mounts
  useEffect(() => {
    const storedJwt = getJwt();
    if (storedJwt) {
      const decodedUser: User | null = decodeJwt(storedJwt);
      setUser(decodedUser);
    }
  }, []);

  return { saveJwt, getJwt, user, jwt };
};

export default useUserData;
