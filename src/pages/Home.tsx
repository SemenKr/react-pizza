import React, { useContext, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/ui/pagination/Pagination";
import { SearchContext } from "../App"; // Импорт контекста поиска из вашего приложения
import {
  selectFilter,
  selectSortDirection,
  selectSortType,
  setCategoryId,
} from "../redux/slices/filterSlice"; // Импорт селектора и экшена из вашего среза фильтра
import { useAppDispatch, useAppSelector } from "../hooks"; // Импорт кастомных хуков useDispatch и useSelector из ваших пользовательских хуков
import { Pizza } from "../components/types"; // Импорт типа Pizza из вашего файла типов

const mockApiUrl =
  "https://661febda16358961cd95eaba.mockapi.io/react-pizzas/items"; // URL-адрес вашего мокового API

const Home: React.FC = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]); // Состояние для хранения списка пицц
  const [isLoading, setIsLoading] = useState<boolean>(true); // Состояние для отслеживания состояния загрузки данных
  const [currentPage, setCurrentPage] = useState<number>(1); // Состояние для отслеживания текущей страницы пагинации
  const { searchValue } = useContext(SearchContext); // Получение значения поиска из контекста поиска

  const sortDirectionDesc = useAppSelector(selectSortDirection);
  const sortType = useAppSelector(selectSortType);
  const categoryId: number = useAppSelector(selectFilter); // Получение выбранной категории из хранилища состояний с помощью селектора
  const dispatch = useAppDispatch(); // Получение диспетчера для отправки экшенов в хранилище

  // Обработчик клика по категории пицц
  const onClickCategory = (index: number): void => {
    dispatch(setCategoryId(index)); // Отправка экшена для установки выбранной категории
    setCurrentPage(1); // Сброс текущей страницы пагинации на первую
  };

  // Загрузка списка пицц при монтировании компонента или изменении зависимых состояний
  useEffect(() => {
    setIsLoading(true); // Установка состояния загрузки в true перед началом загрузки данных

    // Формирование параметров запроса на основе выбранных параметров фильтрации, сортировки и поиска
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    const sort = sortType.sortProperty;
    const order = sortDirectionDesc ? "desc" : "asc";

    // Выполнение запроса к моковому API для получения данных о пиццах
    fetch(
      `${mockApiUrl}?page=${currentPage}&limit=4&${category}${search}&sortBy=${sort}&order=${order}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("not found"); // Обработка ошибки, если запрос не удался
        }
        return res.json(); // Преобразование ответа в формат JSON
      })
      .then((arr: Pizza[]) => {
        setPizzas(arr); // Обновление состояния списка пицц данными из ответа
        setIsLoading(false); // Установка состояния загрузки в false после успешной загрузки данных
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Вывод ошибки в консоль в случае возникновения ошибки загрузки данных
        setPizzas([]); // Сброс списка пицц в пустой массив
        setIsLoading(false); // Установка состояния загрузки в false после возникновения ошибки
      });
    window.scrollTo(0, 0); // Прокрутка страницы вверх после загрузки данных
  }, [categoryId, sortType, searchValue, currentPage, sortDirectionDesc]); // Зависимости, от которых зависит выполнение эффекта

  // Генерация элементов списка пицц на основе данных из состояния
  const items: JSX.Element[] = pizzas.map((pizza: Pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  // Генерация элементов-скелетов для отображения во время загрузки данных
  const skeletonItems: JSX.Element[] = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className={"container"}>
      <div className="content__top">
        {/* Компонент категорий пицц с передачей выбранной категории и обработчика клика */}
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        {/* Компонент сортировки с передачей текущего типа сортировки и обработчика изменения сортировки */}
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {/* Отображение списка пицц или скелетов в зависимости от состояния загрузки */}
      <div className="content__items">{isLoading ? skeletonItems : items}</div>
      {/* Компонент пагинации с передачей обработчика изменения страницы */}
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
