"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import classes from "@/styles/profile.module.css";
import { ShoppingBag } from "@mui/icons-material";

function Profile() {
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    getMyOrder();
  }, []);
  const getMyOrder = async () => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    let response = await fetch(`/api/order?id=${userStorage._id}`);
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  };
  // console.log(myOrders);

  return (
    <section>
      <CustomerHeader />
      <div className="container">
        <h1 className={classes.myorder__title}>My Orders</h1>
        <div className={classes.order__wrapper}>
          {myOrders &&
            myOrders.map((item, ind) => (
              <div key={ind} className={classes.order__card}>
                <div className={classes.card__header}>
                  <span className={classes.card__header_dp}>
                    <ShoppingBag />
                  </span>
                  <div className={classes.card__header_text}>
                    <h3>Order</h3>
                    <span>ID : {truncateText(item.orderId, 15)}</span>
                  </div>
                </div>
                <div className={classes.card__body}>
                  <h3>{item.data.restaurantName}</h3>
                  <p>{item.data.address}</p>
                  <p>
                    Price :{" "}
                    <span>
                      {"\u09F3 "} {item.amount}
                    </span>
                  </p>
                  <p>
                    Order Status :{" "}
                    <span className={classes.status}>{item.status}</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Profile;
