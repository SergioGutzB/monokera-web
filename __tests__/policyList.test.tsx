import { fireEvent, render, screen } from '@testing-library/react';
import PolicyList, { PolicyListProps } from '../src/components/PolicyList';
import PolicyMock from '@/mocks/policy';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

const mockPolicies = PolicyMock(5);

const renderPolicyList = (props?: Partial<PolicyListProps>) => {
  const defaultProps: PolicyListProps = {
    policies: mockPolicies,
  };
  return render(<PolicyList {...defaultProps} {...props} />);
};

test('renders policy list', () => {
  renderPolicyList();
  const policyItems = screen.getAllByTestId('policy-item');
  expect(policyItems).toHaveLength(mockPolicies.length);
});

test('renders policy list with correct values', () => {
  renderPolicyList();

  const policyItems = screen.getAllByTestId('policy-item');

  policyItems.forEach((_policyItem, index) => {
    const policyNumberElement = screen.getByTestId(`policy-number-${index}`);
    const policyEffectiveFromElement = screen.getByTestId(`policy-effective-from-${index}`);
    const policyEffectiveUntilElement = screen.getByTestId(`policy-effective-until-${index}`);
    const policyStatusElement = screen.getByTestId(`policy-status-${index}`);

    expect(policyNumberElement).toBeInTheDocument();
    expect(policyEffectiveFromElement).toBeInTheDocument();
    expect(policyEffectiveUntilElement).toBeInTheDocument();
    expect(policyStatusElement).toBeInTheDocument();

    expect(policyNumberElement).toHaveTextContent(`Policy Number: ${mockPolicies[index].number}`);
    expect(policyEffectiveFromElement).toHaveTextContent(`Effective From: ${mockPolicies[index].effective_from}`);
    expect(policyEffectiveUntilElement).toHaveTextContent(`Effective Until: ${mockPolicies[index].effective_until}`);
    expect(policyStatusElement).toHaveTextContent(`Status: ${mockPolicies[index].status}`);
  });
});

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
});

test('renders policy list with "policy-show-btn" that redirects to /policy/:policyNumber', () => {
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  renderPolicyList();

  const policyShowBtn = screen.getByTestId('policy-show-btn-1');

  expect(policyShowBtn).toBeInTheDocument();

  fireEvent.click(policyShowBtn);

  const expectedPath = `policy/${mockPolicies[1].number}`;
  expect(mockRouter.push).toHaveBeenCalledWith(expectedPath);
});
