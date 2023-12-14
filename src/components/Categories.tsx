import React, { useState } from "react";

const Categories: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onClickCategoty = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => onClickCategoty(0)}
          className={activeIndex === 0 ? "active" : ""}
        >
          Все
        </li>
        <li
          onClick={() => onClickCategoty(1)}
          className={activeIndex === 1 ? "active" : ""}
        >
          Мясные
        </li>
        <li
          onClick={() => onClickCategoty(2)}
          className={activeIndex === 2 ? "active" : ""}
        >
          Вегетарианская
        </li>
        <li
          onClick={() => onClickCategoty(3)}
          className={activeIndex === 3 ? "active" : ""}
        >
          Гриль
        </li>
        <li
          onClick={() => onClickCategoty(4)}
          className={activeIndex === 4 ? "active" : ""}
        >
          Острые
        </li>
        <li
          onClick={() => onClickCategoty(5)}
          className={activeIndex === 5 ? "active" : ""}
        >
          Закрытые
        </li>
      </ul>
    </div>
  );
};

export default Categories;
