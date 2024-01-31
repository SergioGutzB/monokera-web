import { Policy, PolicyCoverage, PolicyInsured } from '@/types';
import Link from 'next/link';
import React from 'react';

async function getPolicy(policyNumber: string): Promise<Policy | null> {
  const response = await fetch(
    `http://localhost:3000/v1/policies/${policyNumber}`
  ).then(res => {
    return res.json();
  });

  if (response) {
    return response as Policy;
  }
  return null;
}

async function PolicyDetails({ params }: { params: { number: string } }) {
  const policyNumber = params.number;
  const policy = await getPolicy(policyNumber);

  if (!policy) {
    return <div>Loading Details...</div>;
  }

  const sectionClass = 'mb-10';

  return (
    <div className="bg-white rounded-lg my-10 px-4 md:px-10 lg:px-20 mx-auto">
      <Link href="/" data-testid="back-btn" passHref legacyBehavior>
        <a
          type="button"
          data-modal-show="go-to-back"
          className="font-medium text-gray-400 hover:text-gray-500"
          aria-label={`Go to back`}
        >
          {'<-'} Go Back
        </a>
      </Link>
      <h1
        className="text-4xl font-bold mb-10 mt-10 text-gray-600"
        aria-label={`Policy Details ${policyNumber}`}
      >
        Policy Details - {policyNumber.toUpperCase()}
      </h1>

      <div className="mb-4 grid md:grid-cols-2 grid-cols-1 justify-center">
        <section className={sectionClass}>
          <h2 className="text-xl font-semibold mb-2 text-purple-600">
            Policyholder
          </h2>
          <ul className="grid grid-cols-1 gap-4 list-none">
            <li>{`${policy.holder.first_name} ${policy.holder.last_name}`}</li>
            <li>
              <span className="text-gray-500">
                {policy.holder.document_type}{' '}
              </span>

              {policy.holder.document_number}
            </li>
            <li>{policy.holder.email}</li>
            <li>
              <span className="text-gray-500">Phone </span>
              {policy.holder.phone}
            </li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className="text-xl font-semibold mb-2 text-purple-600">
            Insureds
          </h2>
          <ul className="grid grid-cols-1 gap-4 list-none">
            {policy.insureds.map((insured: PolicyInsured) => (
              <li key={insured.id}>{insured.name}</li>
            ))}
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className="text-xl font-semibold mb-2 text-purple-600">
            Coverages
          </h2>
          <ul className="grid grid-cols-1 gap-4 list-none">
            {policy.coverages.map((coverage: PolicyCoverage) => (
              <li key={coverage.id}>
                {coverage.name} - Insured Value:{' '}
                <span className="font-medium">${coverage.insured_value}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default PolicyDetails;
