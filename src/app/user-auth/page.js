"use client";

import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import UserSignup from "../_components/UserSignup";
import UserLogin from "../_components/UserLogin";
import classes from "@/styles/restoSignup.module.css";

function UserAuth({ searchParams }) {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <CustomerHeader />
      {isLogin ? (
        <UserLogin redirect={searchParams} />
      ) : (
        <UserSignup redirect={searchParams} />
      )}

      <div className={classes.toggle__btn_wrap}>
        <button
          className={classes.toggle__btn}
          onClick={() => setIsLogin((prevState) => !prevState)}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default UserAuth;
