import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type ChildrenProps = {
  children: ReactNode;
};

export interface PaginatorProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export interface PolicyListProps {
  policies: Policy[];
}

export interface SearchFormProps {
  onSearch: (formData: SearchFormData) => void;
}

interface SearchFormData {
  policyNumber: string;
  startDate: string;
  endDate: string;
  status: string;
}

export enum PolicyStatus {
  active,
  cancelled,
  expired,
}

export enum DocumentType {
  DNI = 'DNI',
  Passport = 'Passport',
  CC = 'CC',
  Nit = 'Nit',
}

export interface PolicyHolder {
  id: number;
  first_name: string;
  middle_name: string | undefined;
  last_name: string;
  second_last_name: string | undefined;
  document_number: string;
  document_type: DocumentType;
  email: string;
  phone: string;
}

export interface PolicyInsured {
  id: number;
  name: string;
}

export interface PolicyCoverage {
  id: number;
  name: string;
  insured_value: string;
}

export interface Policy {
  id: number;
  effective_from: Date | string;
  effective_until: Date | string;
  status: PolicyStatus | string;
  number: string;
  insureds: PolicyInsured[];
  coverages: PolicyCoverage[];
  holder: PolicyHolder;
}
