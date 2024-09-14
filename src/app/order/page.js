"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { SHIPPING_FEE, TAX } from "@/lib/constant";
import { useRouter } from "next/navigation";
import classes from "@/styles/order.module.css";
import Popup from "../_components/Popup";

function Cart() {
  const [userStorage, setUserStorage] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [removeCartData, setRemoveCartData] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [method, setMethod] = useState("");
  const router = useRouter();
  const [total] = useState(() =>
    cartStorage?.length == 1
      ? cartStorage[0].price
      : cartStorage?.reduce((total, item) => {
          return total + Number(item.price);
        }, 0)
  );
  const [popup, setPopup] = useState({
    message: "",
    err: false,
  });
  useEffect(() => {
    setTimeout(() => {
      setPopup({
        message: "",
        err: false,
      });
    }, 4000);
  }, [popup]);
  const handlePlaceOrder = async () => {
    const user_id = JSON.parse(localStorage.getItem("user"))._id;
    const cart = JSON.parse(localStorage.getItem("cart"));
    let foodItemIds = cart.map((item) => item._id).toString();
    let resto_id = cart[0].resto_id;
    let courier_id = "66cf5baa442b9f4f25b2ee7d";

    let collection = {
      user_id,
      resto_id,
      foodItemIds,
      courier_id,
      status: "Pending",
      amount: Math.floor(total + SHIPPING_FEE + (total * TAX) / 100),
    };

    if (method) {
      let response = await fetch(`/api/order/`, {
        method: "POST",
        body: JSON.stringify(collection),
      });
      response = await response.json();

      if (response.success) {
        setPopup({
          message: "Congratulation! Order Placed",
          err: false,
        });
        setRemoveCartData(true);
        router.push("/profile");
      } else {
        setPopup({
          message: "Order failed!",
          err: true,
        });
      }
    } else {
      setPopup({
        message: "Select a payment method!",
        err: true,
      });
    }
  };

  useEffect(() => {
    if (!total) {
      router.push("/");
    }
  }, [total]);

  return (
    <section>
      {popup.message && <Popup popupObj={popup} handler={setPopup} />}
      <CustomerHeader removeCartData={removeCartData} />
      <div className="container">
        <h1 className={classes.checkout__title}>Checkout</h1>
        <div className={classes.checkout__wrapper}>
          <div className={classes.billing__info}>
            <h3>Billing Information</h3>
            <div className={classes.information}>
              <p>{userStorage.name}</p>
              <p>{userStorage.email}</p>
              <p>{userStorage.city}</p>
              <p>{userStorage.address}</p>
              <p>{userStorage.mobile}</p>
            </div>
          </div>
          <div className={classes.payment__info_wrap}>
            <div className={classes.coupon__wrapper}>
              <h3>Have a coupon?</h3>
              <div className={classes.input__wrap}>
                <input
                  type="text"
                  name="coupon"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setIsValid(false);
                  }}
                  placeholder="Enter your coupon"
                />
                <button
                  className={classes.btn__coupon}
                  disabled={coupon ? false : true}
                  onClick={() => setIsValid(true)}
                >
                  Apply
                </button>
              </div>
              {isValid && (
                <span className={classes.invalid__feedback}>
                  Invalid Coupon
                </span>
              )}
            </div>
            <div className={classes.total__payment}>
              <p>
                <span>Total Price :</span>{" "}
                <span>
                  {"\u09F3 "} {total}
                </span>
              </p>
              <p>
                <span>Tax :</span>{" "}
                <span>
                  {"\u09F3 "} {Math.floor((total * TAX) / 100)}
                </span>
              </p>
              <p>
                <span>Shipping Cost :</span>{" "}
                <span>
                  {"\u09F3 "} {SHIPPING_FEE}
                </span>
              </p>
              <p>
                <span>Grand Total :</span>{" "}
                <span>
                  {"\u09F3 "}{" "}
                  {Math.floor(total + SHIPPING_FEE + (total * TAX) / 100)}
                </span>
              </p>
            </div>

            <div className={classes.payment__method_wrap}>
              <h3>Select Payment Method</h3>
              <div className={classes.method}>
                <input
                  type="radio"
                  name="payment"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                />
                <label
                  className={method === "cod" ? null : classes.disabled}
                  onClick={() => setMethod("cod")}
                >
                  Cash On Delivery
                </label>
              </div>
              <div className={classes.method}>
                <input
                  type="radio"
                  name="payment"
                  checked={method === "bkash"}
                  onChange={() => setMethod("")}
                />
                <label className={method === "bkash" ? null : classes.disabled}>
                  BKash
                </label>
              </div>
            </div>

            <div className={classes.order__wrapper}>
              <span>
                {"\u09F3 "}{" "}
                {Math.floor(total + SHIPPING_FEE + (total * TAX) / 100)}
              </span>
              <button
                onClick={handlePlaceOrder}
                className={classes.btn__place_order}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
