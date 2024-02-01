import { Policy, PolicyStatus, DocumentType } from '@/types';
import { faker } from '@faker-js/faker';
const generatePolicyNumber = () => {
  const letters = 'ABC';
  const numbers = faker.number.int({ min: 1, max: 999 }).toString().padStart(3, '0');
  const policyNumber = `${letters}${numbers}`;
  return policyNumber;
};

const generateMockPolicy = (): Policy => {
  return {
    id: faker.number.int(),
    number: generatePolicyNumber(),
    effective_from: faker.date.past(),
    effective_until: faker.date.future(),
    status: faker.helpers.arrayElement(Object.values(PolicyStatus)),
    holder: {
      id: faker.number.int(),
      first_name: faker.person.firstName(),
      middle_name: faker.person.middleName(),
      last_name: faker.person.lastName(),
      second_last_name: faker.person.lastName(),
      document_number: faker.number.int({ min: 1000000, max: 99999999 }).toString(),
      document_type: faker.helpers.arrayElement(Object.values(DocumentType)),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    },
    insureds: [
      {
        id: faker.number.int(),
        name: faker.person.fullName(),
      },
    ],
    coverages: [
      {
        id: faker.number.int(),
        name: faker.commerce.productName(),
        insured_value: faker.number.int({ min: 10000, max: 999999999 }).toString(),
      },
    ],
  };
};

export default generateMockPolicy;
