const UserRepository = require('../repository/users')

class Users {
  constructor() {
    this.repo = new UserRepository();
  }

  async findUser(query, projection = {}) {
    const user = await this.repo.findOne(query, projection);
    return user;
  }

  async create(userData) {
    const newUser = await this.repo.create(userData);
    return newUser;
  }

  async find(query = {}, projection = {}) {
    const users = await this.repo.find(query, projection);
    return users;
  }

  async findByIdAndUpdate(id, updateData, options = { new: true }) {
    const updatedUser = await this.repo.findByIdAndUpdate(id, updateData, options);
    return updatedUser;
  }

  async findByIdAndDelete(id) {
    const deletedUser = await this.repo.findByIdAndDelete(id);
    return deletedUser;
  }

}


module.exports = Users