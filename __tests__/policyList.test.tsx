import { render, screen } from '@testing-library/react';
import PolicyList, { PolicyListProps } from '../src/components/PolicyList';
import PolicyMock from '@/mocks/policy';
import formatDateUTC from '@/utils/formatDate';
import React from 'react';

const mockPolicies = PolicyMock(5);

const renderPolicyList = (props?: Partial<PolicyListProps>) => {
  const defaultProps: PolicyListProps = {
    policies: mockPolicies,
  };
  return render(<PolicyList {...defaultProps} {...props} />);
};

test('renders policy list', () => {
  renderPolicyList();
  const policyRow = screen.getAllByRole('policy-row');
  expect(policyRow).toHaveLength(mockPolicies.length);
});

test('renders policy list with correct values', () => {
  renderPolicyList();

  const policyRow = screen.getAllByRole('policy-row');

  policyRow.forEach((_policyItem, index) => {
    const policyNumberElement = screen.getByTestId(`policy-number-${index}`);
    const policyEffectiveFromElement = screen.getByTestId(`policy-effective-from-${index}`);
    const policyEffectiveUntilElement = screen.getByTestId(`policy-effective-until-${index}`);
    const policyStatusElement = screen.getByTestId(`policy-status-${index}`);

    expect(policyNumberElement).toBeInTheDocument();
    expect(policyEffectiveFromElement).toBeInTheDocument();
    expect(policyEffectiveUntilElement).toBeInTheDocument();
    expect(policyStatusElement).toBeInTheDocument();

    expect(policyNumberElement).toHaveTextContent(`${mockPolicies[index].number}`);
    expect(policyEffectiveFromElement).toHaveTextContent(formatDateUTC(mockPolicies[index].effective_from));
    expect(policyEffectiveUntilElement).toHaveTextContent(formatDateUTC(mockPolicies[index].effective_until));
    expect(policyStatusElement).toHaveTextContent(`${mockPolicies[index].status}`);
  });
});

test('renders policy list with "policy-show-btn" that redirects to /policy/:policyNumber', async () => {
  renderPolicyList();

  const policyShowBtn = screen.getByTestId('policy-show-btn-0');

  // verificamos que
  expect(policyShowBtn).toBeInTheDocument();

  // verificamos atributos aria-label 'Details for policy number '
  expect(policyShowBtn).toHaveAttribute('aria-label', `Details for policy number ${mockPolicies[0].number}`);
  expect(policyShowBtn).toHaveAttribute('href', `/policy/${mockPolicies[0].number}`);

  // await userEvent.click(policyShowBtn);
  // await waitFor(() => expect(screen.getByText(`Policy Details - ${mockPolicies[0].number}`)));
});
