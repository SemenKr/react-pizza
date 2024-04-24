export type SearchType = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};

// Определение типа для размера пиццы
export type PizzaSize = 26 | 30 | 40;

// Определение типа для типа пиццы
export type PizzaType = 0 | 1;

// Определение типа для объекта пиццы
export type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: PizzaType[];
  sizes: PizzaSize[];
  price: number;
  category: number;
  rating: number;
};
