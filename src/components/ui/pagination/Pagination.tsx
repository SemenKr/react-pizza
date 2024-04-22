import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss';

type PaginationProps = {
	onChangePage: (number: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
	return (
		<div className={styles.pagination}>
			<ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
		</div>
	)
}

export default Pagination