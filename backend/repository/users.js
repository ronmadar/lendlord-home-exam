const User = require('../models/users');

class UserRepository {
  async findOne(query, projection = {}) {
    const user = await User.findOne(query).select(projection);
    return user;
  }

  async create(userData) {
    const newUser = await User.create(userData);
    return newUser;
  }

  async find(query = {}, projection = {}) {
    const users = await User.find(query).select(projection);
    return users;
  }

  async findByIdAndUpdate(id, updateData, options = { new: true }) {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, options);
    return updatedUser;
  }

  async findByIdAndDelete(id) {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  }
}

module.exports = UserRepository;
