import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.css';

type PaginationProperties = {
  handlePageClick: (e: { selected: number }) => void;
  dataLength?: number;
  itemsPerPage: number;
};

export function Pagination({ handlePageClick, dataLength, itemsPerPage }: PaginationProperties) {
  return (
    <Box className={styles.offer}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <IconButton
            aria-label="next"
            icon={<ChevronRightIcon />}
            variant="outline"
            fontSize={25}
          />
        }
        previousLabel={
          <IconButton
            aria-label="prev"
            icon={<ChevronLeftIcon />}
            variant="outline"
            fontSize={25}
          />
        }
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        pageClassName={styles.page_item}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        pageCount={dataLength ? Math.ceil(dataLength / itemsPerPage) : 1}
      />
    </Box>
  );
}
