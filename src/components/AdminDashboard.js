// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import SearchBar from "./SearchBar";
import DeleteButton from "./DeleteButton";
import Pagination from "./Pagination";
import "./styles.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (user) => {
    setIsEditMode(true);
    setEditableUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleSave = (id) => {
    setIsEditMode(false);
    setEditableUser(null);
    const updatedUsers = users.map((user) =>
      user.id === id ? editableUser : user
    );
    setUsers(updatedUsers);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditableUser(null);
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    if (editableUser && editableUser.id === userId) {
      setIsEditMode(false);
      setEditableUser(null);
    }
  };

  const DeleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedRows([]);
    setSelectedPages([]);
  };

  const handleSelect = (userId) => {
    const updatedSelection = selectedRows.includes(userId)
      ? selectedRows.filter((id) => id !== userId)
      : [...selectedRows, userId];
    setSelectedRows(updatedSelection);
  };

  const handleSelectAll = () => {
    // if (selectedAll) {
    //   setSelectedRows([]);
    //   setSelectedAll(false);
    // } else {
    //   const allUserIds = users.map((user) => user.id);
    //   setSelectedRows(allUserIds);
    //   setSelectedAll(true);
    // }
    const currentPageUsers = applySearchFilter(users).slice(
      (currentPage - 1) * 10,
      currentPage * 10
    );
    const currentPageUserIds = currentPageUsers.map((user) => user.id);
    const allSelected = currentPageUserIds.every((id) =>
      selectedRows.includes(id)
    );
    const updatedSelection = allSelected
      ? selectedRows.filter((id) => !currentPageUserIds.includes(id))
      : [...selectedRows, ...currentPageUserIds];

    setSelectedRows(updatedSelection);
    setSelectedPages(
      allSelected
        ? selectedPages.filter((page) => page !== currentPage)
        : [...selectedPages, currentPage]
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const calculateTotalPages = () => {
    const filteredUsers = applySearchFilter(users);
    return Math.ceil(filteredUsers.length / 10);
  };

  const applySearchFilter = (data) => {
    return data.filter(
      (user) =>
        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const filteredUsers = applySearchFilter(users).slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1 className="heading">Admin Dashboard</h1>
      <div className="nav">
        <SearchBar onSearch={handleSearch} />
        <DeleteButton onClick={DeleteSelected} />
      </div>

      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        selectedPage={selectedPages.includes(currentPage)}
        selectedRows={selectedRows}
        isEditMode={isEditMode}
        editableUser={editableUser}
        onSave={handleSave}
        onCancelEdit={handleCancelEdit}
        handleChange={handleChange}
      />
      <div className="footer">
        <p className="page-info">
          {selectedRows.length} out of {users.length} row(s) selected.
        </p>
        <div className="footer-right">
          <p className="page-info">
            Page {currentPage} out of {calculateTotalPages()}
          </p>
          <Pagination
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            totalPages={calculateTotalPages()}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
