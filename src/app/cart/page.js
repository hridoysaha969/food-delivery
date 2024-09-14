"use client";

import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { SHIPPING_FEE, TAX } from "@/lib/constant";
import { useRouter } from "next/navigation";
import classes from "@/styles/cart.module.css";

function Cart() {
  // const cartStorage =
  //   localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"));
  // const [cartStorage, setCartStorage] = useState(
  //   JSON.parse(localStorage.getItem("cart"))
  // );

  let cartStorage;
  if (typeof window !== "undefined") {
    cartStorage = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
  const router = useRouter();
  const [total] = useState(() =>
    cartStorage.length == 1
      ? cartStorage[0].price
      : cartStorage.reduce((total, item) => {
          return total + Number(item.price);
        }, 0)
  );
  const handleOrder = () => {
    const isUser = JSON.parse(localStorage.getItem("user"));
    if (isUser) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }
  };

  return (
    <section>
      <CustomerHeader />
      <div className="container">
        <h2 className={classes.cart__page_title}>My Cart</h2>
        <div className={classes.cart__wrapper}>
          <table className={classes.cart__table}>
            <tbody>
              {cartStorage && cartStorage?.length > 0 ? (
                cartStorage.map((item, ind) => (
                  <tr key={ind}>
                    <td>
                      <img
                        className={classes.cart__image}
                        src={item.path}
                        width={150}
                        alt={item.title}
                      />
                    </td>
                    <td>
                      <h3>{item.title}</h3>
                      <p>Quantity : 1</p>
                    </td>

                    <td>
                      <h4>
                        {"\u09F3 "} {item.price}
                      </h4>
                    </td>
                  </tr>
                ))
              ) : (
                <h1>No Food Item Available</h1>
              )}
            </tbody>
          </table>

          <div className={classes.pricing__wrapper}>
            <div className={classes.total__price_wrap}>
              <p>
                <span>Total Price </span>{" "}
                <span>
                  {"\u09F3 "} {total}
                </span>
              </p>
              <p>
                <span>Tax </span>{" "}
                <span>
                  {"\u09F3 "} {Math.floor((total * TAX) / 100)}
                </span>
              </p>
              <p>
                <span>Shipping Cost </span>{" "}
                <span>
                  {"\u09F3 "} {SHIPPING_FEE}
                </span>
              </p>
              <p>
                <span>Grand Total </span>{" "}
                <span>
                  {"\u09F3 "}{" "}
                  {Math.floor(total + SHIPPING_FEE + (total * TAX) / 100)}
                </span>
              </p>
            </div>

            <div className={classes.btn__order_wrap}>
              <button className={classes.btn__order} onClick={handleOrder}>
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
