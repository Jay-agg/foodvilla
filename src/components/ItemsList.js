import { useParams } from "react-router-dom"; // import useParams for read `resId`
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../config";
import useResMenuData from "../Hooks/useResMenuData"; // imported custom hook useResMenuData which gives restaurant Menu data from swigy api
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { useEffect } from "react";

const ItemsList = ({ items }) => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, menuItems] = useResMenuData(
    swiggy_menu_api_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);

  return (
    <div className="menu-items-list">
      {menuItems.map((item) => (
        <div className="menu-item" key={item?.id}>
          <div className="menu-item-details">
            <h3 className="item-title">{item?.name}</h3>
            <p className="item-cost">
              {item?.price > 0
                ? new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(item?.price / 100)
                : " "}
            </p>
            <p className="item-desc">{item?.description}</p>
          </div>
          <div className="menu-img-wrapper">
            {item?.imageId && (
              <img
                className="menu-item-img"
                src={ITEM_IMG_CDN_URL + item?.imageId}
                alt={item?.name}
              />
            )}
            <button onClick={() => handleAddItem(item)} className="add-btn">
              {" "}
              ADD +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
