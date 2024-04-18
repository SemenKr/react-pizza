import React, { useState } from "react";

interface SortProps {
  value: { name: string; sortProperty: string };
  onChangeSort: (obj: { name: string; sortProperty: string }) => void;
  sortDirectionDesc: boolean;
  changeSortDirection: (dir: boolean) => void;
}
const Sort: React.FC<SortProps> = ({
  value,
  onChangeSort,
  changeSortDirection,
  sortDirectionDesc,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const list = [
    { name: "популярности", sortProperty: "rating" },
    { name: "цене", sortProperty: "price" },
    { name: "алфавиту", sortProperty: "alphabet" },
  ];

  const handleClickSelector = (obj: { name: string; sortProperty: string }) => {
    onChangeSort(obj);
    setIsVisible(false);
  };
  const handleSortDirectionChange = () => {
    changeSortDirection(!sortDirectionDesc); // Инвертируем текущее направление сортировки
  };

  return (
    <div className="sort">
      <div
        onClick={() => setIsVisible(!isVisible)}
        className={`sort__label ${isVisible ? "active" : ""}`}
      >
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{value.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => (
              <li
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
                }
                key={index}
                onClick={() => handleClickSelector(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        className={"sort__arrows-btn"}
        onClick={handleSortDirectionChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height={15}
          width={15}
        >
          <path
            d="M9 0c-.3 0-.5.1-.7.3l-8 8c-.2.2-.3.4-.3.7 0 .3.1.5.3.7l1.4 1.4c.2.2.5.3.7.3.3 0 .5-.1.7-.3l2-2c.3-.3.9-.1.9.4V23c0 .5.5 1 1 1h2c.5 0 1-.5 1-1V1c0-.3-.1-.5-.3-.7C9.5.1 9.3 0 9 0zM23.7 14.3l-1.4-1.4c-.2-.2-.5-.3-.7-.3-.3 0-.5.1-.7.3l-2 2c-.3.3-.9.1-.9-.4V1c0-.5-.5-1-1-1h-2c-.5 0-1 .5-1 1v22c0 .3.1.5.3.7s.5.3.7.3c.3 0 .5-.1.7-.3l8-8c.2-.2.3-.4.3-.7 0-.3-.1-.5-.3-.7z "
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};
export default Sort;
