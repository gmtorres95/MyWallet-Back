import faker from 'faker';

export default function createEntry() {
  const entry = {
    value: faker.datatype.number({
      min: 1,
      max: 1000000,
    }),
    income: faker.datatype.boolean(),
  };

  return entry;
}
