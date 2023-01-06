import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useCookies } from "react-cookie";
import Home from "../components/Auth";
const Wrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies();
  const [user, setUser] = useState();

  const checkIsLoggedIn = () => {
    if (cookies.isLoggedIn == null || !cookies.isLoggedIn) {
      // sign in
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  };

  const successLogin = (response) => {
    setCookie("isLoggedIn", true, { path: "/" });
    setUser(response.data.user);
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  return (
    <div>
      {!isLoading ? (
        <div>
          {!isLoggedIn ? (
            <Home successLogin={successLogin} />
          ) : (
            // Routes
            <div>Home page</div>
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};
export default Wrapper;
