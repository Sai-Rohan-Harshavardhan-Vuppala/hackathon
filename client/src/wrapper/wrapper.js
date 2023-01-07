import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useCookies } from "react-cookie";
import Home from "../components/Auth";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";

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
      console.log(cookies.user);
      setUser(cookies.user);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  };

  const successLogin = (response) => {
    setCookie("isLoggedIn", true, { path: "/" });
    setCookie("user", response.data.user, { path: "/" });
    setUser(response.data.user);
    console.log(response.data.user);
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
            <Layout user={user} />
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};
export default Wrapper;
