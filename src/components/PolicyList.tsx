"use client";
import { Policy } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

export interface PolicyListProps {
  policies: Policy[];
}
const PolicyList: React.FC<PolicyListProps> = ({ policies }) => {
  const router = useRouter();
  return (
    <div>
      {policies.map((policy, index) => (
        <div
          key={policy.id}
          className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between"
          data-testid="policy-item"
        >
          <div>
            <p
              className="text-lg font-bold mb-2"
              data-testid={`policy-number-${index}`}
            >{`Policy Number: ${policy.number}`}</p>
            <p
              data-testid={`policy-effective-from-${index}`}
            >{`Effective From: ${policy.effective_from}`}</p>
            <p
              data-testid={`policy-effective-until-${index}`}
            >{`Effective Until: ${policy.effective_until}`}</p>
            <p
              data-testid={`policy-status-${index}`}
            >{`Status: ${policy.status}`}</p>
          </div>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            data-testid={`policy-show-btn-${index}`}
            onClick={() => router.push(`policy/${policy.number}`)}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default PolicyList;
