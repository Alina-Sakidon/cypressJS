class User {
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  static generateRandomUser({
    firstName = 'Test',
    lastName = 'User',
    emailPrefix = 'usertest',
    password = 'Password123',
  } = {}) {
    const random = Math.floor(Math.random() * 10000);
    const email = `${emailPrefix}${random}@gmail.com`;

    return new User(firstName, lastName, email, password);
  }
}

export default User;
