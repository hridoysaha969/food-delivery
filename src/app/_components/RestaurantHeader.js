"use client";
import Image from "next/image";
import logo from "../../../public/logo.png";
import user from "../../../public/user.webp";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import classes from "@/styles/restoHeader.module.css";
import { ArrowDropDown, Login, Logout, Search } from "@mui/icons-material";

function RestaurantHeader() {
  const [detail, setDetail] = useState();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathname == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathname == "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetail(JSON.parse(data));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  };

  return (
    <header className={classes.restaurant__header}>
      <div className={classes.logo}>
        <Image src={logo} width={60} alt="Food Delivery" priority />
        {/* <span>Dashboard</span> */}
      </div>

      <div className={classes.search__bar}>
        <Search />
        <input type="text" placeholder="Search..." />
      </div>
      <div className={classes.profile__wrapper}>
        <div className={classes.profile} onClick={() => setShow(!show)}>
          <Image src={user} width={50} alt="Restaurant User" priority />
          <h4>{detail && detail.restaurantName}</h4>
          {detail && <ArrowDropDown />}
        </div>

        {!detail && (
          <>
            <Link href="/restaurant" className={classes.login__link}>
              {" "}
              <Login /> Login
            </Link>
          </>
        )}

        <ul
          className={`${classes.dropdown__wrap} ${
            show && detail && classes.show
          }`}
        >
          <li>
            <Link href="/">Home</Link>
          </li>
          {detail && detail.email && (
            <>
              {/* <li>
                <Link href="/restaurant/dashboard/">Profile</Link>
              </li> */}
              <li>
                <button className={classes.btn__logout} onClick={logout}>
                  <Logout /> logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default RestaurantHeader;
