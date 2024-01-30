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

export interface PolicyHolder {
  id: number;
  first_name: string;
  middle_name: null;
  last_name: string;
  second_last_name: null;
  document_number: string;
  document_type: string;
  email: string;
  phone: string;
  policy_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface PolicyInsured {}

export interface PolicyCoverage {
  id: number;
  name: string;
  insured_value?: string;
  policy_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Policy {
  effective_from: Date;
  effective_until: Date;
  status: PolicyStatus;
  number: string;
  insureds: PolicyInsured[];
  coverages: PolicyCoverage[];
  holder: PolicyHolder;
}
