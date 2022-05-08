import React from "react";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import { Server } from "../config/config";

function RedirectComponent() {
  const [error, setError] = React.useState(false);

  const location = useLocation();
  const getCurrentURL = () => {
    if (location.pathname[0] === "/") {
      return location.pathname.slice(1);
    }
    return location.pathname;
  };

  React.useEffect(() => {
    const getURL = async () => {
      const data = await api.queryURLs(Server.collectionID, getCurrentURL());
      if (data.documents.length > 0) {
        window.location.href = data.documents[0].longURL;
        console.log("Redirect URL:", data.documents[0].data.longURL);
      }
      setError(true);
      return null;
    };

    getURL().catch((e) => {
      setError(true);
      console.log("Something went wrong");
    });
  }, []);

  return <div>{error ? "Something went wrong" : "Loading..."}</div>;
}

export default RedirectComponent;
