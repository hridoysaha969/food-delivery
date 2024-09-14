import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "@/styles/restoSignup.module.css";
import { Email, Lock } from "@mui/icons-material";
import Popup from "./Popup";

function UserLogin({ redirect }) {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [popup, setPopup] = useState({
    message: "",
    err: false,
  });
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setPopup({
        message: "",
        err: false,
      });
    }, 4000);
  }, [popup]);
  const handleChange = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async () => {
    let response = await fetch(`/api/user/login/`, {
      method: "POST",
      body: JSON.stringify(loginState),
    });
    response = await response.json();
    if (response.success) {
      setPopup({
        message: "Logged in successfully",
        err: false,
      });
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (redirect?.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      setPopup({
        message: "Invalid email or password",
        err: true,
      });
    }
  };
  return (
    <section className={classes.signup__section}>
      {popup.message && <Popup popupObj={popup} handler={setPopup} />}
      <div className="container">
        <div className={classes.signup__wrapper}>
          <div className={classes.form__wrap}>
            <h3 className={classes.signup__title}>Login</h3>
            <div className={classes.input_wrapper}>
              <Email />
              <input
                type="email"
                name="email"
                value={loginState.email}
                placeholder="Enter Email"
                onChange={handleChange}
              />
              {/* {error && !signupState.email && (
            <span className="err__pass">PLease provide an email</span>
          )} */}
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
              {/* {error && !signupState.password && (
            <span className="err__pass"> Provide a strong password.</span>
          )} */}
            </div>

            <div>
              <button className={classes.btn__signup} onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>

          <div className={classes.signup__banner}>
            <h1>
              Welcome Back, <br /> Foodie!
            </h1>

            <p>
              Log in to continue exploring delicious meals from your favorite
              restaurants and chefs. Your next great meal is just a click away.
              Ready to satisfy your cravings?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserLogin;
