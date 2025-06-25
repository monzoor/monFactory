import { faker } from '@faker-js/faker';
import { monFactory } from '../monFactory.js';

monFactory.create(
  {
    _key: "user",
    _repeat: 1,
    _dataKey: "items",
    _paginationKey: "pageMeta",
    _paginationData: {
      pageNumber: 1,
      totalPages: 1,
      totalCount: 5,
      hasPreviousPage: false,
      hasNextPage: false
    }
  },
  () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    jobs: {
      title: faker.person.jobTitle(),
      id: faker.number.int(),
      company: {
        name: faker.company.name(),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
        },
      },
    },
  })
);
