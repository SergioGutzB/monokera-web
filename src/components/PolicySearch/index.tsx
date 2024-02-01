import { PolicyStatus } from '@/types';
import { ChangeEvent, useState } from 'react';
import capitalize from 'lodash/capitalize';

interface PolicySearchProps {
  onSearch: (query: string) => void;
}

function index({ onSearch }: PolicySearchProps) {
  const [searchParams, setSearchParams] = useState({
    number: '',
    effective_from: '',
    effective_until: '',
    status: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prevSearchParams => ({
      ...prevSearchParams,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const queryString = Object.entries(searchParams)
      .filter(([, value]) => value !== '')
      .map(
        ([key, value]) =>
          `${key}=${encodeURIComponent(key === 'effectiveFrom' || key === 'effectiveUntil' ? new Date(value).toISOString() : value)}`
      )
      .join('&');
    onSearch(queryString);
  };

  const handleClear = () => {
    setSearchParams({
      number: '',
      effective_from: '',
      effective_until: '',
      status: '',
    });
    onSearch('');
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="md:flex gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <label htmlFor="policyNumber" className="block text-sm font-medium text-text-gray">
              Policy Number
            </label>
            <input
              type="text"
              id="policyNumber"
              name="number"
              value={searchParams.number}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              aria-label="Policy Number"
            />
          </div>

          <div>
            <label htmlFor="effectiveFrom" className="block text-sm font-medium text-text-gray">
              Effective From
            </label>
            <input
              type="date"
              id="effectiveFrom"
              name="effective_from"
              value={searchParams.effective_from}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              aria-label="Effective From"
            />
          </div>

          <div>
            <label htmlFor="effectiveUntil" className="block text-sm font-medium text-text-gray">
              Effective Until
            </label>
            <input
              type="date"
              id="effectiveUntil"
              name="effective_until"
              value={searchParams.effective_until}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              aria-label="Effective Until"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-text-gray">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={searchParams.status}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              aria-label="Status"
            >
              <option value="">Select Status</option>
              {Object.values(PolicyStatus)
                .slice(0, 3)
                .map(option => (
                  <option value={option} key={`option-${option}`}>
                    {capitalize(option as string)}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-4 gap-4">
          <button
            type="button"
            onClick={handleSearch}
            className="h-10 p-3 bg-brand-main text-white rounded-md hover:bg-brand-accent relative self-end"
            aria-label="Search"
          >
            <span style={{ zoom: 0.7 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="-4 -1 24 24"
                className="w-6 h-6"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-5-5m-9 0a8 8 0 110-16 8 8 0 010 16zM16 16l-5-5"
                />
              </svg>
            </span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="h-10 p-3 bg-text-light text-text-gray rounded-md hover:bg-text-secondary self-end"
            aria-label="Clear"
          >
            <span style={{ zoom: 0.9 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6"
                viewBox="0 4 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6l3 15h12l3-15H3zm4 0V4m8 0V4m0 0h-1M8 10h8"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default index;
