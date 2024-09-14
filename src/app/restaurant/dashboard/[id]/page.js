"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "@/styles/updatefood.module.css";

function UpdateFood({ params }) {
  const [food, setFood] = useState({
    title: "",
    price: "",
    path: "",
    description: "",
  });
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getFoodData();
  }, []);

  const getFoodData = async () => {
    let res = await fetch(`/api/restaurants/foods/update/${params.id}`);
    res = await res.json();
    if (res.success) {
      setFood(res.result);
    }
  };

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

    let res = await fetch(`/api/restaurants/foods/update/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(food),
    });
    res = await res.json();
    if (res.success) {
      alert("Data updated");
      router.push("/restaurant/dashboard/");
    }
  };
  return (
    <section className={classes.update__section}>
      <div className="container">
        <div className={classes.section__wrapper}>
          <h1 className={classes.section__title}>Update food item</h1>

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
            <div className={classes.input__wrap}>
              <input
                type="text"
                name="description"
                value={food.description}
                placeholder="Food Description"
                onChange={handleChange}
              />
              {error && !food.description && (
                <span className="err__pass">Add a short description</span>
              )}
            </div>
          </div>

          <div className={classes.btn__wrapper}>
            <button className={classes.btn__update} onClick={handleClick}>
              Update
            </button>
            <button
              className={classes.btn__cancel}
              onClick={() => router.push("/restaurant/dashboard/")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateFood;
