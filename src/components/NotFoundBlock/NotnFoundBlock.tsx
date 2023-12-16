import { FC } from "react";

import styles from "./NotnFoundBlock.module.scss";

const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        <span>😕</span>
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению, не удалось получить питсы. Попробуйте повторить попытку
        позже.
      </p>
    </div>
  );
};

export default NotFoundBlock;
