import { useEffect, useState } from "react";
import Router from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import LoaderComponent from "@/components/Loader";

const login = "/";
const withAuth = (Component: any) => {
  return (props: any) => {
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
      const checkToken = async () => {
        let local_token: any = getCookie("token");
        if (!local_token) {
          local_token = getCookie("token");
        }
        if (!local_token) {
          setAuthenticated(false);
          Router.replace(login);
          deleteCookie("userId");
          deleteCookie("planId");
          deleteCookie("token");
        } else {
          setAuthenticated(true);
        }
      };
      checkToken();
    }, []);
    if (authenticated) {
      return <Component {...props} />;
    } else {
      return <LoaderComponent />;
    }
  };
};

export default withAuth;
