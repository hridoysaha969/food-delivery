"use client";
import AddFood from "@/app/_components/AddFood";
import FoodList from "@/app/_components/FoodList";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { useState } from "react";
import classes from "@/styles/dashboard.module.css";
import Link from "next/link";
import {
  AddCircleOutline,
  Close,
  HomeOutlined,
  ViewHeadline,
} from "@mui/icons-material";

const Dashboard = () => {
  const [addFood, setAddFood] = useState(false);
  const [showAside, setShowAside] = useState(false);
  return (
    <>
      <RestaurantHeader />
      <section className={classes.dashboard__wrapper}>
        <span className={classes.menu__bar} onClick={() => setShowAside(true)}>
          <ViewHeadline />
        </span>
        <aside
          className={`${classes.sidebar} ${showAside && classes.show__menu}`}
        >
          <span
            className={classes.close__btn}
            onClick={() => setShowAside(false)}
          >
            <Close />
          </span>
          <button onClick={() => setAddFood(false)}>
            <HomeOutlined /> Dashboard
          </button>
          <button onClick={() => setAddFood(true)}>
            <AddCircleOutline /> Add Food
          </button>
        </aside>
        <article className={classes.content}>
          {addFood ? <AddFood setAddFood={setAddFood} /> : <FoodList />}
        </article>
      </section>
    </>
  );
};

export default Dashboard;
