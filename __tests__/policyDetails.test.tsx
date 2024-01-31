import PolicyDetails from '@/app/policy/[number]/page';
import PolicyMock from '@/mocks/policy';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { PolicyCoverage, PolicyInsured } from '@/types';
import { useRouter } from 'next/navigation';

const mockPolicyData = PolicyMock(1)[0];
mockPolicyData.number = 'abc000001';

// Mock server setup
const server = setupServer(
  http.get(`http://localhost:3000/v1/policies/${mockPolicyData.number}`, () => {
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
  expect(
    screen.getByText(`Detalle de Póliza ${mockPolicyData.number}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      `${mockPolicyData.holder.first_name} ${mockPolicyData.holder.last_name}`
    )
  ).toBeInTheDocument();

  // Check if insureds are rendered
  mockPolicyData.insureds.forEach((insured: PolicyInsured) => {
    expect(screen.getByText(insured.name)).toBeInTheDocument();
  });

  // Check if coverages are rendered
  mockPolicyData.coverages.forEach((coverage: PolicyCoverage) => {
    expect(
      screen.getByText(
        `${coverage.name} - Valor Insurado: $${coverage.insured_value}`
      )
    ).toBeInTheDocument();
  });
});

test('renders "Ir Atrás" button', async () => {
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  render(await PolicyDetails({ params: { number: mockPolicyData.number } }));

  // Wait for loading to complete
  await waitFor(() => {});

  // Check if "Ir Atrás" button is rendered
  const goBackButton = screen.getByTestId('back-btn');
  expect(goBackButton).toBeInTheDocument();

  fireEvent.click(goBackButton);

  await waitFor(() => {
    expect(window.location.pathname).toBe('/');
  });
});
