import React, { useState, Fragment } from "react";
import ProgressBar from "./components/ProgressBar";

import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/reducers";
import { bindActionCreators } from "redux";
import { actionCreators } from "./store";
import { signup as signupAPI } from "./services/api";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { signedUp } = bindActionCreators(actionCreators, dispatch);

  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = async () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    const { name, email, password, confirmPassword } = signUp;

    if (name && email && password && confirmPassword) {
      if (!pattern.test(email)) {
        alert("Please enter valid email address.");
        return;
      }

      if (password !== confirmPassword) {
        alert("password and confirm password does not match");
        return;
      }

      const payload = {
        firstName: name,
        email,
        password,
      };

      const response = await signupAPI(payload);
      if (response) {
        setSignUp({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        signedUp(response);
        alert("data added successfully");
      } else {
        alert("something went wrong");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <Fragment>
      <ProgressBar
        signUp={signUp}
        setSignUp={setSignUp}
        handleChange={handleChange}
      />
    </Fragment>
  );
};

export default App;
