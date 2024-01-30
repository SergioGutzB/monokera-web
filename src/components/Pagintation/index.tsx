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
          className={`mx-1 px-3 py-1 border ${currentPage === page ? 'bg-gray-300' : ''}`}
          onClick={() => handlePageChange(page)}
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
          className="mx-1 px-3 py-1 border"
          onClick={() => handlePageChange(1)}
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
          className={`mx-1 px-3 py-1 border ${currentPage === page ? 'bg-gray-300' : ''}`}
          onClick={() => handlePageChange(page)}
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
          className="mx-1 px-3 py-1 border"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center my-4">
      <button
        className="mx-1 px-3 py-1 border"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(prevPage)}
      >
        {'<'}
      </button>

      {renderPages()}

      <button
        className="mx-1 px-3 py-1 border"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(nextPage)}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
