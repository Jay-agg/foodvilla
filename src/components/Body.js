import { useState, useEffect } from "react";
import { restaurantList } from "../config";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((res) =>
    res.info.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filterData;
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    // handle the error using try... catch
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4089123&lng=77.3177894&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await response.json();

      // initialize checkJsonData() function to check Swiggy Restaurant data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);

      // update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  if (!allRestaurants) return null;
  if (filteredRestaurants?.length == 0) return <h1>No Restaurants Found</h1>;

  return allRestaurants.length == 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>

      <div className="restaurantlist">
        {filteredRestaurants.map((restaurant) => {
          return (
            <RestaurantCard {...restaurant.info} key={restaurant.info.id} />
          );
        })}
      </div>
    </>
  );
};

export default Body;
