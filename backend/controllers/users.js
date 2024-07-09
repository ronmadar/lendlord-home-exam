// const { ObjectId } = require('mongodb')
const Users = require('../lib/users');
const users = new Users();

/**
 * Gets user by id
 */
exports.getUserById = async ctx => {
  const { userId } = ctx.params;
  try {
    const user = await users.findUser({ _id: userId });
   
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    }else{
      ctx.status = 200;
      ctx.body = user;
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
}

// Create a new user
exports.createUser = async (ctx) => {
  const userData = ctx.request.body;
  try {
    const newUser = await users.create(userData);
    ctx.status = 201;
    ctx.body = newUser;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message || 'Failed to create user' };
  }
};

// Get all users
exports.getAllUsers = async (ctx) => {
  try {
    const users = await users.find();
    ctx.status = 200;
    ctx.body = users;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message || 'Failed to retrieve users' };
  }
};

// Update user by ID
exports.updateUser = async (ctx) => {
  const { id } = ctx.params;
  const updatedData = ctx.request.body;
  try {
    const updatedUser = await users.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedUser) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    }
    ctx.status = 200;
    ctx.body = updatedUser;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message || 'Failed to update user' };
  }
};

// Delete user by ID
exports.deleteUser = async (ctx) => {
  const { id } = ctx.params;
  try {
    const deletedUser = await users.findByIdAndDelete(id);
    if (!deletedUser) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    }
    ctx.status = 204; // No content
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message || 'Failed to delete user' };
  }
};

// Get manager and their employees
exports.getManagerAndEmployees = async (ctx) => {
  const { managerId } = ctx.params;
  try {
    const manager = await users.findById(managerId).populate('users', '-manager');
    if (!manager || manager.role !== 'Manager') {
      ctx.status = 404;
      ctx.body = { message: 'Manager not found' };
      return;
    }
    const employees = await User.find({ manager: managerId });
    ctx.status = 200;
    ctx.body = { manager, employees };
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message || 'Failed to retrieve manager and employees' };
  }
};
