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

  return (
    <div className="container mx-auto p-4">
      <Link href="/" data-testid="back-btn">
        Ir Atrás
      </Link>
      <h1 className="text-2xl font-bold mb-4">
        Detalle de Póliza {policyNumber}
      </h1>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Tomador</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <dt>Nombre Completo:</dt>
          <dd>{`${policy.holder.first_name} ${policy.holder.last_name}`}</dd>
          <dt>Documento:</dt>
          <dd>{policy.holder.document_number}</dd>
          <dt>Tipo de Documento:</dt>
          <dd>{policy.holder.document_type}</dd>
          <dt>Email:</dt>
          <dd>{policy.holder.email}</dd>
          <dt>Teléfono:</dt>
          <dd>{policy.holder.phone}</dd>
        </dl>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Asegurados</h2>
        <ul className="list-disc pl-4">
          {policy.insureds.map((insured: PolicyInsured) => (
            <li key={insured.id}>{insured.name}</li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Coberturas</h2>
        <ul className="list-disc pl-4">
          {policy.coverages.map((coverage: PolicyCoverage) => (
            <li key={coverage.id}>
              {coverage.name} - Valor Insurado: ${coverage.insured_value}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default PolicyDetails;
