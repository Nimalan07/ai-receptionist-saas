"use client";

import {

  useEffect,

  useState

} from "react";

import {

  useRouter

} from "next/navigation";


export default function useAuth() {

  const router = useRouter();

  const [authenticated,
    setAuthenticated] = useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      router.push("/login");

    } else {

      setAuthenticated(true);
    }

  }, []);

  return authenticated;
}