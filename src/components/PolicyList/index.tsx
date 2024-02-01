import { Policy } from '@/types';
import { getColorStatusClass, getColorStatusStyle } from '@/utils/colorStatus';
import formatDateUTC from '@/utils/formatDate';
import Link from 'next/link';
import React from 'react';
import PolicyStatus from './PolicyStatus';

export interface PolicyListProps {
  policies: Policy[];
}

const PolicyList: React.FC<PolicyListProps> = ({ policies }) => {
  return (
    <div>
      <div className="bg-white py-4 rounded-md shadow-md flex flex-col justify-between">
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
                  <PolicyStatus policy={policy} />
                </td>
                <td
                  scope="row"
                  className="px-6 py-3 hidden md:table-cell"
                  data-testid={`policy-effective-from-${index}`}
                  aria-labelledby={`policy-effective-from-${index}`}
                >
                  {formatDateUTC(policy.effective_from as string)}
                </td>
                <td
                  scope="row"
                  className="px-6 py-3 hidden md:table-cell"
                  data-testid={`policy-effective-until-${index}`}
                  aria-labelledby={`policy-effective-until-${index}`}
                >
                  {formatDateUTC(policy.effective_until as string)}
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
