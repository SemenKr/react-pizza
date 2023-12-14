import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import { PizzaBlock } from "./components/PizzaBlock";
import pizzas from "./assets/pizzas.json";

const App = () => {
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
            <PizzaBlock
              title={"Пепперони Фреш с перцем"}
              price={803}
              imageUrl={
                "https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg"
              }
            />
            <PizzaBlock
              title={"Сырная"}
              price={245}
              imageUrl={
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
