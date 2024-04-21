import React, {useEffect, useState} from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";

const mockApiUrl =
	"https://661febda16358961cd95eaba.mockapi.io/react-pizzas/items";

const Home = ({searchValue}) => {
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

		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue ? `search=${searchValue}` : "";
		const sort = sortType.sortProperty;
		const order = sortDirectionDesc ? "desc" : "asc";


		fetch(`${mockApiUrl}?${category}${search}&sortBy=${sort}&order=${order}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error("not found"); // Генерируем ошибку, если ответ от сервера не ok
				}
				return res.json();
			})
			.then((arr) => {
				setPizzas(arr);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setPizzas([]); // Устанавливаем пустой массив в случае ошибки
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, sortDirectionDesc, searchValue]);

	const items = pizzas
		// .filter((obj) => {
		//   return obj.title.toLowerCase().includes(searchValue.toLowerCase());
		// })
		.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
	const skeletonItems = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

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
			<div className="content__items">{isLoading ? skeletonItems : items}</div>
		</div>
	);
};

export default Home;
