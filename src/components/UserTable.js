import React from "react";

const UserTable = ({
  users,
  onEdit,
  onDelete,
  onSelect,
  onSelectAll,
  selectedPage,
  selectedRows,
  isEditMode,
  editableUser,
  onCancelEdit,
  handleChange,
  onSave,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={onSelectAll}
              checked={selectedPage}
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className={selectedRows.includes(user.id) ? "selected" : ""}
          >
            <td>
              <input
                type="checkbox"
                onChange={() => onSelect(user.id)}
                checked={selectedRows.includes(user.id)}
              />
            </td>
            <td>{user.id}</td>
            <td>
              {isEditMode && editableUser && editableUser.id === user.id ? (
                <input
                  type="text"
                  value={editableUser.name}
                  name="name"
                  onChange={handleChange}
                />
              ) : (
                user.name
              )}
            </td>
            <td>
              {isEditMode && editableUser && editableUser.id === user.id ? (
                <input
                  type="text"
                  value={editableUser.email}
                  name="email"
                  onChange={handleChange}
                />
              ) : (
                user.email
              )}
            </td>
            <td>
              {isEditMode && editableUser && editableUser.id === user.id ? (
                <input
                  type="text"
                  value={editableUser.role}
                  name="role"
                  onChange={handleChange}
                />
              ) : (
                user.role
              )}
            </td>
            <td>
              {isEditMode && editableUser && editableUser.id === user.id ? (
                <>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => onSave(user.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={onCancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
              )}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
