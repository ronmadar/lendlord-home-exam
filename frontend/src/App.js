import React, { useState, useEffect } from 'react'
import axios from 'axios';

import './App.css';
import GenericModal from './components/modal';
import Header from './components/header';

function App() {

  const [shown, setShown] = useState(false)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleModal = () => setShown(prev => !prev);

  return (
    <div className="App">
      <Header />
      <div id="content">
        <button onClick={toggleModal}>Add User</button>
        <GenericModal displayModal={shown} closeModal={toggleModal}>
          <h1>Add New User</h1>
          {/* Form for adding a new user */}
          <form onSubmit={handleAddUser}>
            <label>
              First Name:
              <input type="text" name="firstName" required />
            </label>
            <label>
              Last Name:
              <input type="text" name="lastName" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Date Started:
              <input type="date" name="dateStarted" required />
            </label>
            <label>
              Salary:
              <input type="number" name="salary" required />
            </label>
            <label>
              Role:
              <select name="role" required>
                <option value="Manager">Manager</option>
                <option value="Worker">Worker</option>
                <option value="Driver">Driver</option>
              </select>
            </label>
            <button type="submit">Create User</button>
          </form>
        </GenericModal>
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date Started</th>
              <th>Salary</th>
              <th>Role</th>
              <th>Manager</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{new Date(user.dateStarted).toLocaleDateString()}</td>
                <td>{user.salary}</td>
                <td>{user.role}</td>
                <td>{user.manager ? `${user.manager.firstName} ${user.manager.lastName}` : '-'}</td>
                <td>
                  <button onClick={() => handleEdit(user._id)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  async function handleAddUser(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const userData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      dateStarted: formData.get('dateStarted'),
      salary: formData.get('salary'),
      role: formData.get('role')
    };
    try {
      console.log('this is a test on front')
      await axios.post('http://localhost:3000/api/users', userData);
      fetchUsers();
      setShown(false); // Close modal after successful creation
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  async function handleEdit(userId) {
    console.log('Edit user:', userId);
  }

  async function handleDelete(userId) {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
    }
  }

}

export default App;
