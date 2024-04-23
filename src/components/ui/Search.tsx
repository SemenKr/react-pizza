import React from "react";
import styles from "./Search.module.scss";
import { ReactComponent as IconSearch } from "../../assets/img/icon-search.svg";
import { ReactComponent as IconClose } from "../../assets/img/icon-close.svg";

type SearchProps = {
  className?: string;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};
const Search: React.FC<SearchProps> = ({
  className,
  searchValue,
  setSearchValue,
}) => {
  return (
    <div className={styles.search + " " + className}>
      <input
        className={styles.search__input}
        type="text"
        placeholder={"Поиск пиццы..."}
        value={searchValue}
        onChange={(e) => {
					setSearchValue(e.target.value)
				}}
      />
      <IconSearch className={styles.search__icon} />
      {searchValue && (
        <button
          className={styles.search__close}
          onClick={() => setSearchValue("")}
        >
          <IconClose />
        </button>
      )}
    </div>
  );
};

export default Search;
