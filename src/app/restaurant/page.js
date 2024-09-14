"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantHeader from "../_components/RestaurantHeader";
import classes from "@/styles/restoSignup.module.css";

function Restaurant() {
  const [login, setLogin] = useState(true);
  return (
    <>
      <RestaurantHeader />
      {login ? <RestaurantLogin /> : <RestaurantSignup />}
      <div className={classes.toggle__btn_wrap}>
        <button
          className={classes.toggle__btn}
          onClick={() => setLogin((prevState) => !prevState)}
        >
          {login ? "Don't have an account? Signup" : "Have an account? Login"}
        </button>
      </div>
    </>
  );
}

export default Restaurant;
