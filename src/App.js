import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import contact from "./pages/contact";
import { onGetContactAction } from "./redux/action";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    dispatch(onGetContactAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>loading</h1>
      </div>
    );
  } else {
    return (
      <div>
        <Switch>
          <Route path={"/"} exact component={contact} />
        </Switch>
      </div>
    );
  }
}
export default App;
