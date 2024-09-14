"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "@/styles/restoSignup.module.css";
import { Email, Lock } from "@mui/icons-material";

function RestaurantLogin() {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const route = useRouter();

  const handleChange = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    if (!loginState.email || !loginState.password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let res = await fetch("/api/restaurants/", {
      method: "POST",
      body: JSON.stringify({ ...loginState, login: true }),
    });
    res = await res.json();

    if (res.success) {
      alert("Login Successful");
      const { result } = res;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      route.push("/restaurant/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <section className={classes.signup__section}>
      <div className="container">
        <div className={classes.signup__wrapper}>
          <div className={classes.form__wrap}>
            <h3 className={classes.signup__title}>Restaurant Login</h3>
            <div className={classes.input_wrapper}>
              <Email />
              <input
                type="email"
                name="email"
                value={loginState.email}
                placeholder="Enter Email"
                onChange={handleChange}
              />
              {error && !loginState.email && (
                <span className="err__pass"> Provide a valid email.</span>
              )}
            </div>
            <div className={classes.input_wrapper}>
              <Lock />
              <input
                type="password"
                name="password"
                value={loginState.password}
                placeholder="Enter Password"
                onChange={handleChange}
              />
              {error && !loginState.password && (
                <span className="err__pass"> Provide a valid password.</span>
              )}
            </div>
            <div>
              <button className={classes.btn__signup} onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>

          <div className={classes.signup__banner}>
            <h1>
              Owner's Portal <br /> Login.
            </h1>

            <p>
              Access your restaurant dashboard by logging into your account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RestaurantLogin;
