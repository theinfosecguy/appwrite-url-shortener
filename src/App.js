import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Search from "./pages/StormURL/Search";
import Login from "./pages/Auth/Login";
import Landing from "./pages/Landing/Landing";
import { useGetUser } from "./hooks";
import RedirectComponent from "./pages/RedirectComponent";
import SignUp from "./pages/Auth/SignUp";

function App() {
  // eslint-disable-next-line
  const [{ user, isLoading, isError }, dispatch] = useGetUser();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/urls">
          {user ? (
            <Search user={user} dispatch={dispatch} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/urls" /> : <Login dispatch={dispatch} />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/urls" /> : <SignUp dispatch={dispatch} />}
        </Route>
        <Route path="/:query">
          <RedirectComponent />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
