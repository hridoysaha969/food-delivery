import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "@/styles/dashboard.module.css";
import { DeleteOutline, DriveFileRenameOutline } from "@mui/icons-material";

function FoodList() {
  const [foodList, setFoodList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getFoodItem();
  }, []);

  const getFoodItem = async () => {
    const userData = JSON.parse(localStorage.getItem("restaurantUser"));
    let res = await fetch(`/api/restaurants/foods/${userData._id}`);
    res = await res.json();

    if (res.success) {
      setFoodList(res.result);
    } else {
      alert("Can't find food");
    }
  };

  const deleteFood = async (title, id) => {
    let response = await fetch(`/api/restaurants/foods/${id}`, {
      method: "DELETE",
    });
    response = await response.json();
    if (response.success) {
      alert(`${title} deleted successfully`);
      getFoodItem();
    } else {
      alert(`Failed to delete ${title}`);
    }
  };

  return (
    <section className={classes.food__list_section}>
      <div className={classes.list__wrapper}>
        <table>
          <thead>
            <tr>
              <th>#No.</th>
              <th>Image</th>
              <th className={classes.food__title_header}>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {foodList &&
              foodList.map((food, ind) => (
                <tr key={ind} className={classes.list__row}>
                  <td>{ind + 1}</td>
                  <td>
                    <img
                      src={food.path}
                      width={80}
                      height={60}
                      alt={food.title}
                    />
                  </td>
                  <td className={classes.food__title}>{food.title}</td>
                  <td>
                    {"\u09F3 "}
                    {food.price}
                  </td>
                  {/* <td>{food.description}</td> */}
                  <td className={classes.action__wrapper}>
                    <button
                      className={classes.btn__edit}
                      onClick={() =>
                        router.push(`/restaurant/dashboard/${food._id}`)
                      }
                    >
                      <DriveFileRenameOutline /> <span>Edit</span>
                    </button>
                    <button
                      className={classes.btn__delete}
                      onClick={() => deleteFood(food.title, food._id)}
                    >
                      <DeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default FoodList;
