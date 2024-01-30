import { Policy } from "@/types";
import generateMockPolicy from "@/utils/generateMockPolicy";

const PolicyMock = jest.fn();

PolicyMock.mockImplementation((count: number): Policy[] => {
  return Array.from({ length: count }, () => generateMockPolicy());
});

export default PolicyMock;
