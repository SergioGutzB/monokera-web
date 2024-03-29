import PolicyDetails from '@/app/policy/[number]/page';
import settings from '@/config/settings';
import PolicyMock from '@/mocks/policy';
import { PolicyCoverage, PolicyInsured } from '@/types';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { useRouter } from 'next/navigation';

const mockPolicyData = PolicyMock(1)[0];
mockPolicyData.number = 'abc000001';

// Mock server setup
const server = setupServer(
  http.get(`${settings.apiUrl}policies/${mockPolicyData.number}`, () => {
    return HttpResponse.json(mockPolicyData);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
});

test('renders policy details correctly', async () => {
  render(await PolicyDetails({ params: { number: mockPolicyData.number } }));

  // Wait for loading to complete
  await waitFor(() => {});

  // Check if policy details are rendered correctly
  expect(screen.getByTestId(`policy-number-details-${mockPolicyData.number}`)).toBeInTheDocument();
  expect(
    screen.getByText(`${mockPolicyData.holder.first_name} ${mockPolicyData.holder.last_name}`)
  ).toBeInTheDocument();

  // Check if insureds are rendered
  mockPolicyData.insureds.forEach((insured: PolicyInsured) => {
    expect(screen.getByText(insured.name)).toBeInTheDocument();
  });

  // Check if coverages are rendered
  mockPolicyData.coverages.forEach((coverage: PolicyCoverage) => {
    expect(screen.getByText(`${coverage.name} - Insured Value:`)).toBeInTheDocument();
  });
});

test('renders "Go back" button', async () => {
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  render(await PolicyDetails({ params: { number: mockPolicyData.number } }));

  // Wait for loading to complete
  await waitFor(() => {});

  // Check if "Go Back" button is rendered
  const goBackButton = screen.getByTestId('back-btn');
  expect(goBackButton).toBeInTheDocument();

  fireEvent.click(goBackButton);

  await waitFor(() => {
    expect(window.location.pathname).toBe('/');
  });
});
