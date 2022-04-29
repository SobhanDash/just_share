import React from "react";
import { useHistory } from "react-router-dom";
import css from "./register.module.css";
import Register from "../../components/Form/Register";

const RegisterPage = () => {
  const history = useHistory();

  if (localStorage.getItem("token")) {
    history.push("/");
  }

  return (
    <>
      <div className={css.register_bg}>
        <section className={css.container}>
          <section className={css.mainRegisterContainer}>
            <div className={`${css.half} ${css.left}`}>
              <Register />
            </div>
            <div className={`${css.half} ${css.right}`}></div>
          </section>
        </section>
      </div>
    </>
  );
};

export default RegisterPage;
