import classes from "@/styles/serachResto.module.css";
import { Search } from "@mui/icons-material";
import { useEffect } from "react";

function SearchRestaurant({ setRestaurants }) {
  useEffect(() => {
    // getLocations();
    getRestaurants();
  }, []);

  const getRestaurants = async (query) => {
    let url = "/api/customer/";
    if (query?.location) {
      url = `/api/customer?location=${query.location}`;
    } else if (query?.restaurant) {
      url = `/api/customer?restaurant=${query.restaurant}`;
    }

    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
    }
  };

  return (
    <section className={classes.search__section}>
      <div className="container">
        <div className={classes.search__wrapper}>
          <div className={classes.text}>
            <h2>
              Looking For A<p>Quality Restaurant?</p>
            </h2>
          </div>
          <div className={classes.input__wrap}>
            <input
              className="search__input"
              type="text"
              placeholder="Search Food or Restaurant"
              onChange={(e) => getRestaurants({ restaurant: e.target.value })}
            />
            <Search />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchRestaurant;
