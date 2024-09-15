"use client";

import CustomerHeader from "@/app/_components/CustomerHeader";
import { useEffect, useState } from "react";
import classes from "@/styles/explore.module.css";
import {
  AddShoppingCart,
  Apartment,
  Delete,
  Email,
  Phone,
  Place,
} from "@mui/icons-material";

function RestaurantName({ params, searchParams }) {
  const name = params.name;
  const [details, setDetails] = useState();
  const [foodItem, setFoodItem] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState([]);
  const [cartIds, setCartIds] = useState(
    cartStorage ? () => cartStorage.map((item) => item._id) : []
  );
  const [removeCart, setRemoveCard] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart"));
    if (data) {
      setCartStorage(data);
    }
    getRestaurantDetails();
  }, []);
  const getRestaurantDetails = async () => {
    let response = await fetch(`/api/customer/${searchParams.id}`);
    response = await response.json();
    if (response.success) {
      setDetails(response.details);
      setFoodItem(response.foods);
    }
  };

  const addToCart = (item) => {
    setCartData(item);
    let localCartIds = cartIds;
    localCartIds.push(item._id);
    setCartIds(localCartIds);
    setRemoveCard();
  };
  const removeFromCart = (id) => {
    setRemoveCard(id);
    const localIds = cartIds.filter((item) => item != id);
    setCartData();
    setCartIds(localIds);
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <section>
      <CustomerHeader cartData={cartData} removeCart={removeCart} />
      <div className="container">
        <div className={classes.restaurant__details}>
          <div className={classes.details__card}>
            <h3
              data-text={decodeURI(name).charAt(0)}
              className={classes.profile__name}
            >
              {decodeURI(name)}
            </h3>

            <div className={classes.info__wrapper}>
              <p>
                <span>
                  <Phone /> {details?.contactNo}
                </span>
                <span>
                  <Email /> {details?.email}{" "}
                </span>
              </p>
              <p>
                <span>
                  <Apartment /> {details?.city},{" "}
                </span>
                <span>
                  <Place /> {details?.address}
                </span>
              </p>
            </div>
          </div>

          <h2 className={classes.latest__title}>Latest Food</h2>
          <div className={classes.food__list}>
            {foodItem.length > 0 ? (
              foodItem.map((item, ind) => (
                <div className={classes.food__card} key={ind}>
                  <div className={classes.card__img}>
                    <img src={item.path} width={150} alt={item.title} />
                  </div>
                  <div className={classes.card__body}>
                    <h3>{truncateText(item.title, 20)}</h3>
                    <p>{truncateText(item.description, 40)}</p>
                    <div className={classes.bottom__wrap}>
                      <h4>
                        {"\u09F3 "} {item.price}
                      </h4>

                      {cartIds.includes(item._id) ? (
                        <button
                          className={classes.btn__cart_remove}
                          onClick={() => removeFromCart(item._id)}
                        >
                          <Delete />
                        </button>
                      ) : (
                        <button
                          className={classes.btn__cart_add}
                          onClick={() => addToCart(item)}
                        >
                          <AddShoppingCart />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={classes.empty__card}>
                <h1>No Food Item Available</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RestaurantName;
