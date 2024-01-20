import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../../config";
import { MenuShimmer } from "./Shimmer";

const Menu = () => {
  const { resId } = useParams();

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const [restaurant, setRestaurant] = useState({});
  const [menuItems, setMenuItems] = useState([]);

  async function getRestaurantInfo() {
    try {
      const response = await fetch(swiggy_menu_api_URL + resId);
      const json = await response.json();

      const restaurantData =
        json?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;
      setRestaurant(restaurantData);
    } catch (error) {
      setRestaurant(null);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMenuItems();
  }, [resId]);
  async function fetchMenuItems() {
    try {
      const response = await fetch(swiggy_menu_api_URL + resId);
      const json = await response.json();

      const menuItemsData =
        json?.data?.cards
          .find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          .map((x) => x.card?.info) || [];

      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });
      setMenuItems(uniqueMenuItems);
    } catch (error) {
      setMenuItems([]);
      console.log(error);
    }
    return menuItems;
  }

  return (
    <div className="menu">
      <div className="menuname">
        <h1>restaurant id: {resId} </h1>
        <h2>{restaurant.name}</h2>
        <img src={IMG_CDN_URL + restaurant.cloudinaryImageId} />
        <h3>{restaurant.area}</h3>
        <h3>{restaurant.city}</h3>
        <h3>{restaurant.avgRating} stars</h3>
        <h3>{restaurant.costForTwoMsg}</h3>
      </div>
      <div className="menuitems">
        <h1>Menu</h1>
        <ul>
          {Object.values(menuItems).map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
