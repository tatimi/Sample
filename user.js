class User {
  constructor(a, b) {
      this.firstName = a;
      this.lastName = b;
  }

  fullName() {
      return this.firstName + " " + this.lastName;
  }
}

const user1 = new User("daiki", "hashiba");
const user2 = new User("isao", "ebisujima");
console.log(user1.fullName());
console.log(user1.a);
console.log(user2.fullName());