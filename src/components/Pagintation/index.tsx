'use client';
import { PaginationProps } from '@/types';
import React from 'react';

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  nextPage,
  prevPage,
  onPageChange,
}) => {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const handlePageChange = (page: number | null) => {
    if (onPageChange && page) {
      onPageChange(page);
    }
  };

  const renderPages = () => {
    if (totalPages <= 5) {
      return range(1, totalPages).map(page => (
        <button
          key={page}
          className={`mx-1 px-3 py-1  text-gray-600 rounded-full ${currentPage === page ? 'bg-purple-50' : ''}`}
          onClick={() => handlePageChange(page)}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ));
    }

    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    if (start > 1) {
      pages.push(
        <button
          key={1}
          className="mx-1 px-3 py-1  text-gray-600"
          onClick={() => handlePageChange(1)}
          aria-label={`Go to page 1`}
        >
          1
        </button>,
        <span key="ellipsis1">...</span>
      );
    }

    pages.push(
      ...range(start, end).map(page => (
        <button
          key={page}
          className={`mx-1 px-3 py-1  text-gray-600  rounded-full ${currentPage === page ? 'bg-purple-50' : ''}`}
          onClick={() => handlePageChange(page)}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))
    );

    if (end < totalPages) {
      pages.push(
        <span key="ellipsis2">...</span>,
        <button
          key={totalPages}
          className="mx-1 px-3 py-1  text-gray-600"
          onClick={() => handlePageChange(totalPages)}
          aria-label={`Go to page ${totalPages}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center my-4"
    >
      <button
        tabIndex={currentPage === 1 ? -1 : 0}
        className="mx-1 px-3 py-1  focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-35 text-gray-600"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(prevPage)}
        aria-label={`Go to previous page ${prevPage}`}
      >
        {'<'}
      </button>
      <ul className="flex list-none" role="list">
        {renderPages()}
      </ul>

      <button
        tabIndex={currentPage === totalPages ? -1 : 0}
        className="mx-1 px-3 py-1  focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-35 text-gray-600"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(nextPage)}
        aria-label={`Go to next page ${nextPage}`}
      >
        {'>'}
      </button>
    </nav>
  );
};

export default Pagination;
