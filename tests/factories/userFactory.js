import faker from 'faker';

export default function createUser() {
  const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return user;
}
