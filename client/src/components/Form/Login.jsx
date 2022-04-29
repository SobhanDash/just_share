import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import { toast } from "react-toastify";
import validation from "../../utils/validation";

import css from "./form.module.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Login = () => {
  const user = useSelector(state=> state.userReducer.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [lValues, setLValues] = useState({email: "", password: ""});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLValues({
      ...lValues,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors(validation(lValues));
    if (lValues.email === "" || lValues.password === "") {
      toast.error("Enter All Fields", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      dispatch(actionCreators.login(lValues));
      setLValues({email: "", password: ""});
      history.push('/');
    }
    
  };

  useEffect(()=> {
    if(user) {
      history.push("/");
    }
  },[user]);

  return (
    <>
      <form className={css.form}>
        <header className={css.form_header}>
          <h5 className={css.welcome}>Welcome</h5>
          <h2>Sign in Now</h2>
        </header>
        <main className={css.form_main}>
          <div className={css.email}>
            <label htmlFor="Email address">Email Address</label>
            <input
              type="text"
              placeholder="email@example.com"
              id="email"
              name="email"
              value={lValues.email}
              onChange={handleChange}
              emailerror={errors.email}
            />
          </div>
          <div className={css.password}>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              name="password"
              value={lValues.password}
              onChange={handleChange}
              passworderror={errors.password}
            />
          </div>
          <button className={css.login_btn} onClick={handleLogin}>
            Login
          </button>
        </main>
        <footer className={css.form_footer}>
          <div>
            <span className={css.dull}>Dont Have an account?</span>
            <a href="/register" className={css.register_link}>
              Register
            </a>
          </div>
        </footer>
      </form>
    </>
  );
};

export default Login;
