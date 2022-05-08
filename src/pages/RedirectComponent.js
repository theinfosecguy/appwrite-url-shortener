import React from "react";
import { useLocation, useHistory } from "react-router-dom";
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
      } else {
        setError(true);
        return null;
      }
    };

    getURL().catch((e) => {
      setError(true);
    });
  }, []);

  return <>{error ? <Error /> : <Loader />}</>;
}

const Loader = () => {
  return (
    <div className="loader min-h-screen flex justify-center items-center">
      <img
        src="https://ucarecdn.com/63bccd62-61f4-47a0-8046-15da0df0e3f2/"
        alt="Loader logo"
        height={100}
      />
    </div>
  );
};

const Error = () => {
  const history = useHistory();
  return (
    <div className="loader min-h-screen flex justify-center items-center">
      <img
        src="https://ucarecdn.com/79b92b90-578b-4c77-ad87-3c99b6ed7b53/"
        alt="Error logo"
        className="h-[150px]"
      />
      <button onClick={() => history.push("/")} className="old-btn">
        Go back
      </button>
    </div>
  );
};

export default RedirectComponent;
