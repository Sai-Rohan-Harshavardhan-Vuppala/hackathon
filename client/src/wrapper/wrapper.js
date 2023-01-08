import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Home from "../components/Auth";
import Layout from "../components/Layout";
import axios from "axios";

const Wrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies();
  const [user, setUser] = useState();

  const fetchUser = async () => {
    const response = await axios.get(`/api/user/${cookies.user._id}`, {withCredentials: true});
    if(response.data.status === "success") {
      setUser(response.data.data.doc);
    }
  };
  
  const checkIsLoggedIn = async () => {
    if (cookies.isLoggedIn == null || !cookies.isLoggedIn) {
      // sign in
      setIsLoggedIn(false);
    } else {
      console.log(cookies.user);
      await fetchUser();
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  };

  const successLogin = (response) => {
    setCookie("isLoggedIn", true, { path: "/" });
    setUser(response.data.user);
    console.log(response.data.user);
    response.data.user.invoices = [];
    setCookie("user", response.data.user, { path: "/" });
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkIsLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
