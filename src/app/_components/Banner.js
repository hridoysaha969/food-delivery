import classes from "@/styles/banner.module.css";
import { useState, useEffect } from "react";
import sliderImg1 from "../../../public/hero_img_1.png";
import sliderImg2 from "../../../public/hero_img_2.png";
import Image from "next/image";
import { Place } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

function Banner({ setRestaurants }) {
  const [locations, setLocations] = useState([]);
  const [selsected, setSelected] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getLocations();
    getRestaurants();
  }, []);

  const getLocations = async () => {
    let response = await fetch("/api/customer/locations");
    response = await (await response).json();
    if (response.success) {
      setLocations(response.result);
    }
  };

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

  const handleSelect = (item) => {
    setSelected(item);
    getRestaurants({ location: item });
  };

  return (
    <section className={classes.banner__section}>
      <div className="container">
        <div className={classes.banner__wrapper}>
          <div className={classes.search__corner}>
            <h2>
              Find <span className={classes.highlight}>Restaurant</span>
              <p>
                Near <span className={classes.highlight}>You </span>
              </p>
            </h2>

            <div className={classes.input__wrap}>
              <Place />
              <input
                className={classes.search__input}
                value={selsected}
                type="text"
                placeholder="Select Your Place"
                onChange={(e) => {
                  handleSelect(e.target.value);
                  setShow(true);
                  if (!e.target.value) {
                    setShow(false);
                  }
                }}
              />

              <ul className={classes.dropdown}>
                {show &&
                  locations.map((item, ind) => (
                    <li
                      key={ind}
                      onClick={() => {
                        handleSelect(item);
                        setShow(false);
                      }}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className={classes.slider__container}>
            <Swiper
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation={false}
              autoplay={{
                delay: 2000, // 3000ms (3 seconds) delay between slides
                disableOnInteraction: false, // Continue autoplay after user interaction
              }}
            >
              <SwiperSlide>
                <div className={classes.slider}>
                  <div className={classes.slider__text}>
                    <h1>
                      Fastest Delivery
                      <p>& Easy Pickup</p>
                    </h1>
                  </div>
                  <div className={classes.slider__img}>
                    <Image src={sliderImg1} width={200} alt="Slider" priority />
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className={classes.slider__2}>
                  <div className={classes.slider__text}>
                    <h1>
                      Upto <span>50%</span> Off
                      <p>In First Order</p>
                    </h1>
                  </div>
                  <div className={classes.slider__img}>
                    <Image src={sliderImg2} width={200} alt="Slider" priority />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
