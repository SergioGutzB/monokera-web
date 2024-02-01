import { Policy } from '@/types';
import { getColorStatusClass, getColorStatusStyle } from '@/utils/colorStatus';
import React from 'react';

function PolicyStatus({ policy }: { policy: Policy }) {
  return (
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
  );
}

export default PolicyStatus;
