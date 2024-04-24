import React, { useContext, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/ui/pagination/Pagination";
import { SearchContext } from "../App";
import { selectFilter, setCategoryId } from "../redux/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Pizza } from "../components/types";

const mockApiUrl =
  "https://661febda16358961cd95eaba.mockapi.io/react-pizzas/items";

const Home: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortType, setSortType] = useState<{
    name: string;
    sortProperty: string;
  }>({
    name: "популярности",
    sortProperty: "rating",
  });
  const [sortDirectionDesc, setSortDirectionDesc] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchValue } = useContext(SearchContext);

  const categoryId: number = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  const onClickCategory = (index: number): void => {
    dispatch(setCategoryId(index));
    setCurrentPage(1);
  };

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    const sort = sortType.sortProperty;
    const order = sortDirectionDesc ? "desc" : "asc";

    fetch(
      `${mockApiUrl}?page=${currentPage}&limit=4&${category}${search}&sortBy=${sort}&order=${order}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("not found");
        }
        return res.json();
      })
      .then((arr: Pizza[]) => {
        setPizzas(arr);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setPizzas([]);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortDirectionDesc, searchValue, currentPage]);

  const items: JSX.Element[] = pizzas.map((pizza: Pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  const skeletonItems: JSX.Element[] = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className={"container"}>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort
          value={sortType}
          onChangeSort={(index) => {
            setSortType(index);
            setCurrentPage(1);
          }}
          sortDirectionDesc={sortDirectionDesc}
          changeSortDirection={(dir) => setSortDirectionDesc(dir)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletonItems : items}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
