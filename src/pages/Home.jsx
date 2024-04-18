import React, { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";

const mockApiUrl =
  "https://661febda16358961cd95eaba.mockapi.io/react-pizzas/items";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [sortDirectionDesc, setSortDirectionDesc] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${mockApiUrl}?${categoryId > 0 ? `categoty=${categoryId}` : ""}&sortBy=${
        sortType.sortProperty
      }&order=${sortDirectionDesc ? "desc" : "asc"}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortDirectionDesc]);

  return (
    <div className={"container"}>
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(index) => setCategoryId(index)}
        />
        <Sort
          value={sortType}
          onChangeSort={(index) => setSortType(index)}
          sortDirectionDesc={sortDirectionDesc}
          changeSortDirection={(dir) => setSortDirectionDesc(dir)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
