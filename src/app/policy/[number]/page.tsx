import PolicyStatus from '@/components/PolicyList/PolicyStatus';
import Progress from '@/components/Progress';
import settings from '@/config/settings';
import { Policy, PolicyCoverage, PolicyInsured } from '@/types';
import calculatePolicyPercentage from '@/utils/calculatePolicyPercentage';
import formatDateUTC from '@/utils/formatDate';
import Link from 'next/link';
import React from 'react';

async function getPolicy(policyNumber: string): Promise<Policy | null> {
  const response = await fetch(`${settings.apiUrl}policies/${policyNumber}`).then(res => {
    return res.json();
  });

  if (response) {
    return response as Policy;
  }
  return null;
}

function TitleSection({ title }: { title: string }) {
  return <h2 className="text-xl font-semibold mb-2 text-text-secondary">{title}</h2>;
}

async function PolicyDetails({ params }: { params: { number: string } }) {
  const policyNumber = params.number;
  const policy = await getPolicy(policyNumber);

  if (!policy) {
    return <div>Loading Details...</div>;
  }

  const sectionClass = 'border rounded-lg p-4 min-h-[200px]';

  return (
    <div className="bg-white rounded-lg my-10 px-4 lg:px-20 mx-auto">
      <Link href="/" passHref legacyBehavior>
        <a
          data-testid="back-btn"
          type="button"
          data-modal-show="go-to-back"
          className="font-medium text-text-secondary hover:text-text-dark"
          aria-label={`Go to back`}
          role="link"
        >
          {'<-'} Go Back
        </a>
      </Link>
      <h1
        className="text-4xl font-bold mb-10 mt-10 text-gray-900"
        aria-label={`Policy Details ${policyNumber}`}
        role="heading"
      >
        Policy Details{' '}
        <span className="text-primary" data-testid={`policy-number-details-${policy.number}`}>
          {policyNumber.toUpperCase()}
        </span>
      </h1>

      <div className="mb-4 grid md:grid-cols-2 grid-cols-1 justify-center gap-1 md:gap-8">
        <section className={sectionClass}>
          <TitleSection title="Policy info" />
          <ul className="grid grid-cols-1 gap-4 list-none">
            <li>
              <span className="text-text-dark">Effective from: </span>
              {formatDateUTC(policy.effective_from as string)}
            </li>
            <li>
              <span className="text-text-dark">Effective until: </span>
              {formatDateUTC(policy.effective_until as string)}
            </li>
            <li>
              <Progress percentage={calculatePolicyPercentage(policy)} trailColor="bg-active" />
            </li>
            <li>
              <div className="flex gap-4">
                <span className="text-text-dark">Status:</span>
                <PolicyStatus policy={policy} />
              </div>
            </li>
          </ul>
        </section>
        <section className={sectionClass}>
          <TitleSection title="Holder" />
          <ul className="grid grid-cols-1 gap-4 list-none">
            <li>{`${policy.holder.first_name} ${policy.holder.last_name}`}</li>
            <li>
              <span className="text-text-dark">{policy.holder.document_type} </span>

              {policy.holder.document_number}
            </li>
            <li>{policy.holder.email}</li>
            <li>
              <span className="text-text-dark">Phone </span>
              {policy.holder.phone}
            </li>
          </ul>
        </section>

        <section className={sectionClass}>
          <TitleSection title="Insureds" />
          <ul className="grid grid-cols-1 gap-4 list-none">
            {policy.insureds.map((insured: PolicyInsured) => (
              <li key={insured.id}>{insured.name}</li>
            ))}
          </ul>
        </section>

        <section className={sectionClass}>
          <TitleSection title="Coverages" />
          <ul className="grid grid-cols-1 gap-4 list-none">
            {policy.coverages.map((coverage: PolicyCoverage) => (
              <li key={coverage.id}>
                {coverage.name} - Insured Value: <span className="font-medium">${coverage.insured_value}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default PolicyDetails;
