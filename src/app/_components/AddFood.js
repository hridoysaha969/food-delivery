import { useState } from "react";
import classes from "@/styles/addFood.module.css";

function AddFood({ setAddFood }) {
  const [food, setFood] = useState({
    title: "",
    price: "",
    path: "",
    description: "",
  });
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = async () => {
    if (!food.title || !food.price || !food.path || !food.description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    const userData = JSON.parse(localStorage.getItem("restaurantUser"));
    let resto_id;
    if (userData) {
      resto_id = userData._id;
    }

    let res = await fetch(`/api/restaurants/foods/`, {
      method: "POST",
      body: JSON.stringify({ ...food, resto_id }),
    });
    res = await res.json();
    console.log(res);

    if (res.success) {
      alert("Food item added");
      setFood({
        title: "",
        price: "",
        path: "",
        description: "",
      });
      setAddFood(false);
    } else {
      alert("Failed to add product");
    }
  };
  const handleClear = () => {
    setFood({
      title: "",
      price: "",
      path: "",
      description: "",
    });
  };
  return (
    <section className={classes.addFood__section}>
      <h1 className={classes.section__title}>Add a new food item</h1>

      <div className={classes.layout}>
        <div className={classes.input__container}>
          <div className={classes.input__wrap}>
            <input
              type="text"
              name="title"
              value={food.title}
              placeholder="Food Title"
              onChange={handleChange}
            />
            {error && !food.title && (
              <span className="err__pass">Food title required</span>
            )}
          </div>
          <div className={classes.input__wrap}>
            <textarea
              type="text"
              name="description"
              value={food.description}
              placeholder="Food Description"
              onChange={handleChange}
              rows={10}
            />
            {error && !food.description && (
              <span className="err__pass">Add a short description</span>
            )}
          </div>
          <div className={classes.input__wrap}>
            <input
              type="text"
              name="price"
              value={food.price}
              placeholder="Set price"
              onChange={handleChange}
            />
            {error && !food.price && (
              <span className="err__pass">Please set a price</span>
            )}
          </div>
          <div className={classes.input__wrap}>
            <input
              type="text"
              name="path"
              value={food.path}
              placeholder="Enter path"
              onChange={handleChange}
            />
            {error && !food.path && (
              <span className="err__pass">Provide a food image URL</span>
            )}
          </div>
        </div>

        <div className={classes.publish__wrapper}>
          <h5>Publish</h5>
          <div className={classes.drfat__wrap}>
            <button className={classes.btn__draft}>Save Draft</button>
            <button className={classes.btn__draft}>Preview</button>
          </div>
          <div className={classes.bottom__wrap}>
            <h4 onClick={handleClear}>Clear All</h4>
            <button className={classes.btn__add} onClick={handleClick}>
              Publish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddFood;
