import { faker } from '@faker-js/faker';
class User {
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  static generateRandomUser(password = 'Password123') {
    const firstName = faker.person.firstName().replace(/[^a-zA-Z]/g, '').substring(0, 8);
    const lastName = faker.person.lastName().replace(/[^a-zA-Z]/g, '').substring(0, 8);
    
    const email = faker.internet.email({
      firstName,
      lastName,
      provider: 'example.com',
    }).toLowerCase();

    return new User(firstName, lastName, email, password);
  }
}

export default User;
