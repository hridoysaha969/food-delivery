import classes from "@/styles/restaurantList.module.css";
import { Storefront } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

function RestaurantList({ restaurants }) {
  const router = useRouter();
  return (
    <section className={classes.restaurant__list_section}>
      <div className="container">
        <h3 className={classes.restaurant__list_title}>Top Restaurants</h3>

        <div className={classes.restaurant__card_wrapper}>
          {restaurants.map((item, ind) => (
            <div
              className={classes.restaurant__card}
              key={ind}
              onClick={() =>
                router.push(`/explore/${item.restaurantName}?id=${item._id}`)
              }
            >
              <div className={classes.card__avatar_wrapper}>
                <span className={classes.store__icon}>
                  <Storefront />
                </span>
                <h4>{item.restaurantName}</h4>
              </div>
              <div className={classes.details}>
                <p>This Restaurant is near {item.city}</p>
                <p>{item.address}</p>
              </div>
              <button className={classes.btn__visit}>View restaurant</button>
            </div>
          ))}
        </div>
        {restaurants.length > 0 ? null : <Loading />}
      </div>
    </section>
  );
}

export default RestaurantList;
