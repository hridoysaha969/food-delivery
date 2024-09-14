"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import { useRouter } from "next/navigation";
import Banner from "./_components/Banner";
import SearchRestaurant from "./_components/SearchRestaurant";
import RestaurantList from "./_components/RestaurantList";
import RegestrationBanner from "./_components/RegestrationBanner";
import RestaurantFooter from "./_components/RestaurantFooter";
import Popup from "./_components/Popup";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

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

  return (
    <main>
      <CustomerHeader />
      <Banner setRestaurants={setRestaurants} />
      <SearchRestaurant setRestaurants={setRestaurants} />

      <RestaurantList restaurants={restaurants} />
      <RegestrationBanner />
      <RestaurantFooter />
    </main>
  );
}
