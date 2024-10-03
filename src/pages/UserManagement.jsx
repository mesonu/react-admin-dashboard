import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, TextInput, Label } from 'flowbite-react';
import { fetchUsers, addUser, editUser, deleteUser, toggleUserEnabled } from '../features/user/userSlice';
import { FaEdit, FaTrash, FaEye, FaToggleOn, FaToggleOff, FaSortUp, FaSortDown } from 'react-icons/fa';
import Pagination from '../components/Pagination';

const UserManagement = () => {
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  const dispatch = useDispatch();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = () => {
    const newUser = { ...formData, enabled: true };
    dispatch(addUser(newUser));
    setAddModalOpen(false);
    setFormData({ name: '', email: '', role: '' });
  };

  const handleEditUser = () => {
    dispatch(editUser(formData));
    setEditModalOpen(false);
    setFormData({ name: '', email: '', role: '' });
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleToggleUserEnabled = (user) => {
    dispatch(toggleUserEnabled({ id: user.id, enabled: !user.enabled }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setFormData(user);
    setEditModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({ name: '', email: '', role: '' });
    setAddModalOpen(true);
  };

  const openViewModal = (user) => {
    setCurrentUser(user);
    setViewModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    setFormData({ name: '', email: '', role: '' });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setFormData({ name: '', email: '', role: '' });
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setCurrentUser(null);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaSortUp style={{"display":"inline"}}/> : <FaSortDown style={{"display":"inline"}}/>;
    }
    return null;
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-2 md:space-y-0">
        <TextInput
          id="search"
          name="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="md:w-1/2"
        />
        <Button onClick={openAddModal} className="md:ml-2">Add User</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('id')}>
                ID {getSortIcon('id')}
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('name')}>
                Name {getSortIcon('name')}
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('email')}>
                Email {getSortIcon('email')}
              </th>
              <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('role')}>
                Role {getSortIcon('role')}
              </th>
              {/* <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort('addDate')}>Add Date</th> */}
              <th className="py-2 px-4 border-b">Enabled</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <Button size="xs" onClick={() => handleToggleUserEnabled(user)}>
                    {user.enabled ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-red-500" />}
                  </Button>
                </td>
                <td className="py-2 px-4 border-b space-x-2 flex">
                  <Button size="xs" onClick={() => openViewModal(user)}>
                    <FaEye />
                  </Button>
                  <Button size="xs" onClick={() => openEditModal(user)}>
                    <FaEdit />
                  </Button>
                  <Button size="xs" color="failure" onClick={() => handleDeleteUser(user.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
       {/* Pagination */}
       <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />

      {/* Add User Modal */}
      <Modal show={isAddModalOpen} onClose={closeAddModal}>
        <Modal.Header>Add User</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="role" value="Role" />
              <TextInput
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddUser}>Add</Button>
          <Button color="gray" onClick={closeAddModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={isEditModalOpen} onClose={closeEditModal}>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="role" value="Role" />
              <TextInput
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditUser}>Save</Button>
          <Button color="gray" onClick={closeEditModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View User Modal */}
      <Modal show={isViewModalOpen} onClose={closeViewModal}>
        <Modal.Header>View User</Modal.Header>
        <Modal.Body>
          {currentUser && (
            <div className="space-y-6">
              <div>
                <Label value="Name" />
                <p>{currentUser.name}</p>
              </div>
              <div>
                <Label value="Email" />
                <p>{currentUser.email}</p>
              </div>
              <div>
                <Label value="Role" />
                <p>{currentUser.role}</p>
              </div>
              <div>
                <Label value="Enabled" />
                <p>{currentUser.enabled ? 'Yes' : 'No'}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={closeViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;