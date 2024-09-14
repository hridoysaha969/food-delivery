import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import classes from "@/styles/restoSignup.module.css";
import {
  EditLocation,
  Email,
  Lock,
  Person,
  Phone,
  Place,
} from "@mui/icons-material";
import Popup from "./Popup";

function UserSignup({ redirect }) {
  const [signUpState, setSignupState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    city: "",
    address: "",
    mobile: "",
  });
  const [error, setError] = useState(false);
  const [passError, setPassError] = useState(false);
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
    setSignupState({
      ...signUpState,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, city, address, mobile } = signUpState;

    if (password !== signUpState.confirmPass) {
      setPassError(true);
      return false;
    } else {
      setPassError(false);
    }

    if (
      !email ||
      !password ||
      !signUpState.confirmPass ||
      !name ||
      !city ||
      !address ||
      !mobile
    ) {
      setError(true);
      setPopup({
        message: "All the field is required",
        err: true,
      });
      return false;
    } else {
      setError(false);
    }

    let response = await fetch(`/api/user/`, {
      method: "POST",
      body: JSON.stringify({ name, email, password, city, address, mobile }),
    });
    response = await response.json();
    if (response.success) {
      setPopup({
        message: "Signed in successfully",
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
        message: response.result,
        err: true,
      });
    }
  };

  return (
    <section className={classes.signup__section}>
      {popup.message && <Popup popupObj={popup} handler={setPopup} />}
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
            <h3 className={classes.signup__title}>Signup</h3>

            <div className={classes.input__grid}>
              <div className={classes.input_wrapper}>
                <Person />
                <input
                  type="text"
                  name="name"
                  value={signUpState.name}
                  placeholder="Enter Name"
                  onChange={handleChange}
                />
                {/* {error && !signUpState.name && (
                  <span className="err__pass">Please provide a name</span>
                )} */}
              </div>
              <div className={classes.input_wrapper}>
                <Email />
                <input
                  type="email"
                  name="email"
                  value={signUpState.email}
                  placeholder="Enter Email"
                  onChange={handleChange}
                />
                {/* {error && !signUpState.email && (
                  <span className="err__pass">PLease provide an email</span>
                )} */}
              </div>
            </div>
            <div className={classes.input_wrapper}>
              <Lock />
              <input
                type="password"
                name="password"
                value={signUpState.password}
                placeholder="Enter Password"
                onChange={handleChange}
              />
              {/* {error && !signUpState.password && (
                <span className="err__pass"> Provide a strong password.</span>
              )} */}
            </div>
            <div className={classes.input_wrapper}>
              <Lock />
              <input
                type="password"
                name="confirmPass"
                value={signUpState.confirmPass}
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              {/* {passError && (
                <span className="err__pass">Password doesn't match</span>
              )}
              {error && !signUpState.confirmPass && (
                <span className="err__pass">PLease provide an email</span>
              )} */}
            </div>
            <div className={classes.input__grid}>
              <div className={classes.input_wrapper}>
                <Place />
                <input
                  type="text"
                  name="city"
                  value={signUpState.city}
                  placeholder="Enter City"
                  onChange={handleChange}
                />
                {/* {error && !signUpState.city && (
                  <span className="err__pass">Provide your city</span>
                )} */}
              </div>
              <div className={classes.input_wrapper}>
                <EditLocation />
                <input
                  type="text"
                  name="address"
                  value={signUpState.address}
                  placeholder="Enter Address"
                  onChange={handleChange}
                />
                {/* {error && !signUpState.address && (
                  <span className="err__pass">Address requieed</span>
                )} */}
              </div>
            </div>
            <div className={classes.input_wrapper}>
              <Phone />
              <input
                type="text"
                name="mobile"
                value={signUpState.mobile}
                placeholder="Enter Phone No."
                onChange={handleChange}
              />
              {/* {error && !signUpState.mobile && (
                <span className="err__pass">Mobile no. required</span>
              )} */}
            </div>

            <div>
              <button className={classes.btn__signup} onClick={handleSubmit}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserSignup;
