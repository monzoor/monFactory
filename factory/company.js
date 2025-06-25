import { faker } from '@faker-js/faker';
import { monFactory } from '../monFactory.js';
import { createAndMapArray } from '../utils/arrayUtils.js';

monFactory.create(
  {
    _key: "companyItems",
    _repeat: 100,
  },
  () => ({
    nama: faker.person.fullName(),
    emel: faker.internet.email(),
    alamat: faker.location.streetAddress(),
    pekerjaan: createAndMapArray(5, () => ({
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
    })),
  })
);
