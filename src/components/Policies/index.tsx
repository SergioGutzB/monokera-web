'use client';

import React, { useEffect, useState } from 'react';
import Pagination from '../Pagintation';
import PolicyList from '../PolicyList';
import PolicySearch from '../PolicySearch';
import { PaginationProps } from '@/types';
import generatePaginationProps from '@/utils/generatePaginationProps';

import { ITEMS_PER_PAGE } from '@/config';

const Policies: React.FC = () => {
  const [policies, setPolicies] = useState([]);
  const [pagination, setPagination] = useState<PaginationProps>({
    totalPages: 1,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
  });

  const handlePageChange = (currentPage: number): void => {
    if (pagination) {
      setPagination({ ...pagination, currentPage });
    }
  };

  const fetchPolicies = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:3000/v1/policies/${query}&items=${ITEMS_PER_PAGE}`);
      const { data, paginated } = await response.json();
      setPolicies(data || []);
      if (paginated) {
        setPagination(generatePaginationProps(paginated, handlePageChange));
      }
    } catch (error) {}
  };

  const handleSearch = (query: string) => {
    fetchPolicies(`?${query}&page=1`);
  };

  useEffect(() => {
    fetchPolicies(`?page=${pagination.currentPage}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage]);

  return (
    <div className="bg-white rounded-lg m-10">
      <div className="my-10 text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Policy Hub: <span className="text-purple-600">Simplified Search and Filter</span>
        </h1>
      </div>
      <PolicySearch onSearch={handleSearch} />
      <PolicyList policies={policies} />
      <Pagination {...pagination}></Pagination>
    </div>
  );
};

export default Policies;
