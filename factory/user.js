import { faker } from '@faker-js/faker';
import { monFactory } from '../monFactory.js';

monFactory.create(
  {
    _key: "user",
    _repeat: 1,
    _dataKey: "data",
    // _paginationKey: "pageMeta",
    // _paginationData: {
    //   pageNumber: 1,
    //   totalPages: 1,
    //   totalCount: 5,
    //   hasPreviousPage: false,
    //   hasNextPage: false
    // }
  },
  () => ({
    nama: faker.person.fullName(),
    emel: faker.internet.email(),
    alamat: faker.location.streetAddress(),
    pekerjaan: {
      jawatan: faker.person.jobTitle(),
      id: faker.number.int(),
      syarikat: {
        nama: faker.company.name(),
        alamat: {
          jalan: faker.location.streetAddress(),
          bandar: faker.location.city(),
          negeri: faker.location.state(),
          poskod: faker.location.zipCode(),
        },
      },
    },
  })
);
