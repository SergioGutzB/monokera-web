import { Policy } from '@/types';
import { getColorStatusClass, getColorStatusStyle } from '@/utils/colorStatus';
import Link from 'next/link';
import React from 'react';

export interface PolicyListProps {
  policies: Policy[];
}
const PolicyList: React.FC<PolicyListProps> = ({ policies }) => {
  return (
    <div>
      <div
        className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between"
        data-testid="policy-item"
      >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4">
                Policy Number
              </th>
              <th scope="col" className="px-4 py-4">
                Status
              </th>
              <th scope="col" className="px-6 py-4">
                Effective From
              </th>
              <th scope="col" className="px-6 py-4">
                Effective Until
              </th>
              <th scope="col" className="px-3 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr
                className={`${index % 2 ? 'bg-white' : 'bg-gray-50'} border-b`}
                key={policy.id}
              >
                <th
                  scope="row"
                  className="px-6 py-3 font-medium text-gray-700 whitespace-nowrap uppercase"
                  data-testid={`policy-number--${index}`}
                >
                  {policy.number}
                </th>
                <td
                  className="px-4 py-3"
                  data-testid={`policy-status-${index} camelcase`}
                >
                  <div className="flex items-center first-line:uppercase">
                    <div
                      className={`h-2.5 w-2.5 rounded-full me-2 ${getColorStatusClass(policy.status)}`}
                      style={{
                        backgroundColor: getColorStatusStyle(policy.status),
                      }}
                    ></div>{' '}
                    {policy.status}
                  </div>
                </td>
                <td
                  className="px-6 py-3"
                  data-testid={`policy-effective-from-${index}`}
                >
                  {policy.effective_from.toString()}
                </td>
                <td
                  className="px-6 py-3"
                  data-testid={`policy-effective-until-${index}`}
                >
                  {policy.effective_until.toString()}
                </td>
                <td className="px-3 py-3">
                  <Link
                    passHref
                    href={`/policy/${policy.number}`}
                    legacyBehavior
                  >
                    <a
                      type="button"
                      data-modal-show="policy-details"
                      className="font-medium text-purple-400 hover:underline"
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
