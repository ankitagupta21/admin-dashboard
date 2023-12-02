import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";

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
                    className="save"
                    onClick={() => onSave(user.id)}
                    cursor="pointer"
                  >
                    <FontAwesomeIcon icon={faSave} />
                  </button>
                  <button
                    className="cancel"
                    onClick={onCancelEdit}
                    cursor="pointer"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </>
              ) : (
                <button
                  className="edit"
                  onClick={() => onEdit(user)}
                  cursor="pointer"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )}
              <button
                className="delete-row"
                onClick={() => onDelete(user.id)}
                cursor="pointer"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
