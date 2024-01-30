// tests/policyList.test.tsx
import { render, screen } from '@testing-library/react';
import PolicyList from '../components/PolicyList';
import { PolicyListProps } from '../interfaces';

const mockPolicies: Policy[] = /* Mock data de pólizas */;

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
  // Puedes agregar más validaciones según tus necesidades
});
