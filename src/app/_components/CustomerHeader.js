"use client";
import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "@/styles/customerHeader.module.css";
import { ShoppingCart, ArrowDropDown } from "@mui/icons-material";

function CustomerHeader({ cartData, removeCart, removeCartData }) {
  const [userStorage, setUserStorage] = useState([]);
  const [cartStorage, setCartStorage] = useState([]);
  const [clientOnly, setClientOnly] = useState(false);
  const [user, setUser] = useState(userStorage ? userStorage : undefined);
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserStorage(
        localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
      );
      setCartStorage(
        localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"))
      );
    }
  }, []);

  useEffect(() => {
    setClientOnly(true);
    setUser(userStorage ? userStorage : undefined);
    if (cartData) {
      if (cartNumber) {
        if (cartItem[0].resto_id !== cartData.resto_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([cartData]);
          localStorage.setItem("cart", JSON.stringify([cartData]));
        } else {
          let localCart = cartItem;
          localCart.push(JSON.parse(JSON.stringify(cartData)));
          setCartNumber(cartNumber + 1);
          setCartItem(localCart);
          localStorage.setItem("cart", JSON.stringify(localCart));
        }
      } else {
        setCartNumber(1);
        setCartItem([cartData]);
        localStorage.setItem("cart", JSON.stringify([cartData]));
      }
    }
  }, [cartData, cartItem, cartNumber, userStorage]);

  useEffect(() => {
    if (removeCart) {
      let localCartItem = cartItem.filter((item) => {
        return item._id != removeCart;
      });
      setCartItem(localCartItem);
      setCartNumber(cartNumber - 1);
      localStorage.setItem("cart", JSON.stringify(localCartItem));
      if (localCartItem.length == 0) {
        localStorage.removeItem("cart");
      }
    }
  }, [removeCart, cartItem, cartNumber]);

  useEffect(() => {
    if (removeCartData) {
      setCartItem([]);
      setCartNumber(0);
      localStorage.removeItem("cart");
    }
  }, [removeCartData]);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/user-auth");
  };

  return (
    <header className={classes.header__wrapper}>
      <div className="container">
        <nav className={classes.navbar_wrapper}>
          <Link href="/" className={classes.logo}>
            <Image src={logo} width={80} alt="Food Delivery" priority />
            <div className={classes.logo__text}>
              <h3>
                {`HS's`} <span>Food</span>
              </h3>
              <h4>
                <span>Court</span>
              </h4>
            </div>
          </Link>
          <div className={classes.link__wrapper}>
            {clientOnly ? (
              <ul>
                <li>
                  <Link href={cartItem ? "/cart" : "/"}>
                    <span
                      className={classes.cart__link}
                      data-text={cartNumber ? cartNumber : 0}
                    >
                      <ShoppingCart />
                    </span>
                  </Link>
                </li>
                <li>
                  {user ? (
                    <>
                      <button
                        className={classes.nav__profile_btn}
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        <span className={classes.profile_avatar}>
                          {user?.name?.charAt(0)}
                        </span>
                        <span className={classes.profile__name}>
                          {user?.name}
                        </span>
                        <ArrowDropDown />
                      </button>

                      {showMenu && (
                        <div className={classes.dropdown}>
                          <>
                            <li>
                              <Link href="/">Home</Link>
                            </li>
                            <li>
                              <Link href="/profile">My Profile</Link>
                            </li>
                            <li>
                              <button
                                onClick={logout}
                                className={classes.logout__btn}
                              >
                                Logout
                              </button>
                            </li>
                          </>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <Link href="/user-auth" className={classes.btn__link}>
                        Login
                      </Link>
                    </>
                  )}
                </li>
              </ul>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default CustomerHeader;
