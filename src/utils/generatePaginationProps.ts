import { Paginated, PaginationProps } from '@/types';

const generatePaginationProps = (
  pagination: Paginated,
  onChange: (page: number) => void
): PaginationProps => {
  const { items, next, prev, page, total_pages } = pagination;
  return {
    currentPage: page,
    items,
    nextPage: next,
    prevPage: prev,
    totalPages: total_pages,
    onPageChange: onChange,
  } as PaginationProps;
};

export default generatePaginationProps;
