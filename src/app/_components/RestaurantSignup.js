"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "@/styles/restoSignup.module.css";
import { Email, Lock } from "@mui/icons-material";

function RestaurantSignup() {
  const [signupState, setSignupState] = useState({
    email: "",
    password: "",
    confirmPass: "",
    restaurantName: "",
    city: "",
    address: "",
    contactNo: "",
  });
  const [error, setError] = useState(false);
  const [passError, setPassError] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setSignupState({
      ...signupState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    const { email, password, restaurantName, city, address, contactNo } =
      signupState;
    if (password !== signupState.confirmPass) {
      setPassError(true);
      return false;
    } else {
      setPassError(false);
    }

    if (
      !email ||
      !password ||
      !signupState.confirmPass ||
      !restaurantName ||
      !city ||
      !address ||
      !contactNo
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let data = await fetch("/api/restaurants/", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        restaurantName,
        city,
        address,
        contactNo,
      }),
    });
    data = await data.json();
    console.log(data);
    if (data.success) {
      console.log(data);
      const { result } = data;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  };
  return (
    <section className={classes.signup__section}>
      <div className="container">
        <div className={`${classes.signup__wrapper} ${classes.login__wrapper}`}>
          <div className={classes.login__banner}>
            <h1>
              Join the Food <br /> Revolution
            </h1>
            <p>
              Sign up now and get access to a world of delicious meals delivered
              straight to your door. Enjoy fast, convenient food delivery at
              your fingertips!
            </p>
          </div>

          <div className={classes.login__form_wrap}>
            <h3 className={classes.signup__title}>Restaurant Signup Page</h3>

            <div className={classes.input_wrapper}>
              <Email />
              <input
                type="email"
                name="email"
                value={signupState.email}
                placeholder="Enter Email"
                onChange={handleChange}
              />
              {error && !signupState.email && (
                <span className="err__pass">PLease provide an email</span>
              )}
            </div>
            <div className={classes.input__grid}>
              <div className={classes.input_wrapper}>
                <Lock />
                <input
                  type="password"
                  name="password"
                  value={signupState.password}
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
                {error && !signupState.password && (
                  <span className="err__pass"> Provide a strong password.</span>
                )}
              </div>
              <div className={classes.input_wrapper}>
                <Lock />
                <input
                  type="password"
                  name="confirmPass"
                  value={signupState.confirmPass}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
                {passError && (
                  <span className="err__pass">Password doesn't match</span>
                )}
                {error && !signupState.confirmPass && (
                  <span className="err__pass"> Confirm your password</span>
                )}
              </div>
            </div>

            <div className={classes.input_wrapper}>
              <input
                type="text"
                name="restaurantName"
                value={signupState.restaurantName}
                placeholder="Restaurant Name"
                onChange={handleChange}
              />
              {error && !signupState.restaurantName && (
                <span className="err__pass">Add a resturant name</span>
              )}
            </div>
            <div className={classes.input__grid}>
              <div className={classes.input_wrapper}>
                <input
                  type="text"
                  name="city"
                  value={signupState.city}
                  placeholder="Enter City"
                  onChange={handleChange}
                />
                {error && !signupState.city && (
                  <span className="err__pass">Enter a city</span>
                )}
              </div>
              <div className={classes.input_wrapper}>
                <input
                  type="text"
                  name="address"
                  value={signupState.address}
                  placeholder="Full Address"
                  onChange={handleChange}
                />
                {error && !signupState.address && (
                  <span className="err__pass">Please provide full adress</span>
                )}
              </div>
            </div>

            <div className={classes.input_wrapper}>
              <input
                type="text"
                name="contactNo"
                value={signupState.contactNo}
                placeholder="Contact No"
                onChange={handleChange}
              />
              {error && !signupState.contactNo && (
                <span className="err__pass"> Provide your contact no.</span>
              )}
            </div>
            <div>
              <button className={classes.btn__signup} onClick={handleSignUp}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RestaurantSignup;
