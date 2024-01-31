import { Policy } from '@/types';
import { getColorStatusClass, getColorStatusStyle } from '@/utils/colorStatus';
import { formatInTimeZone } from 'date-fns-tz';
import Link from 'next/link';
import React from 'react';

export interface PolicyListProps {
  policies: Policy[];
}

const PolicyList: React.FC<PolicyListProps> = ({ policies }) => {
  return (
    <div>
      <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4">
                Policy Number
              </th>
              <th scope="col" className="px-4 py-4 hidden md:table-cell">
                Status
              </th>
              <th scope="col" className="px-6 py-4 hidden md:table-cell">
                Effective From
              </th>
              <th scope="col" className="px-6 py-4 hidden md:table-cell">
                Effective Until
              </th>
              <th scope="col" className="px-3 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr
                className={`policy-item ${index % 2 ? 'bg-white' : 'bg-gray-50'} border-b`}
                key={`policy-${policy.number}`}
                data-testid={`policy-item-${index} policy-item`}
                role="policy-row"
              >
                <td
                  scope="row"
                  className="px-6 py-3 font-medium text-gray-700 whitespace-nowrap uppercase"
                  data-testid={`policy-number-${index}`}
                >
                  {policy.number}
                </td>
                <td scope="row" className="px-4 py-3 hidden md:table-cell" data-testid={`policy-status-${index}`}>
                  <div className="flex items-center first-line:uppercase">
                    <span
                      className={`h-2.5 w-2.5 rounded-full me-2 ${getColorStatusClass(policy.status)}`}
                      style={{
                        backgroundColor: getColorStatusStyle(policy.status),
                      }}
                      aria-label={`Policy number {policy.number} with status ${policy.status}`}
                    ></span>{' '}
                    {policy.status}
                  </div>
                </td>
                <td
                  scope="row"
                  className="px-6 py-3 hidden md:table-cell"
                  data-testid={`policy-effective-from-${index}`}
                  aria-labelledby={`policy-effective-from-${index}`}
                >
                  {formatInTimeZone(new Date(policy.effective_from), 'UTC', 'yyyy-MM-dd')}
                </td>
                <td
                  scope="row"
                  className="px-6 py-3 hidden md:table-cell"
                  data-testid={`policy-effective-until-${index}`}
                  aria-labelledby={`policy-effective-until-${index}`}
                >
                  {formatInTimeZone(new Date(policy.effective_until), 'UTC', 'yyyy-MM-dd')}
                </td>
                <td className="px-3 py-3" scope="row">
                  <Link passHref href={`/policy/${policy.number}`} legacyBehavior>
                    <a
                      type="button"
                      data-modal-show="policy-details"
                      className="font-medium text-purple-400 hover:underline"
                      aria-label={`Details for policy number ${policy.number}`}
                      data-testid={`policy-show-btn-${index}`}
                    >
                      Details
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PolicyList;
