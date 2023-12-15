import React, { useEffect, useState } from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import { PizzaBlock } from "./components/PizzaBlock";

const App = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("https://657c2ed1853beeefdb98d9e2.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPizzas(json);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
