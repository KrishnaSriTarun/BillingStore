import { useState } from "react";
import { deleteUser } from "../../Service/UserService";
import toast from "react-hot-toast";
import "./UserList.css";

function UserList({ users, setUsers }) {
      const [searchUser, setSearchUser] = useState('');

      const filtredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchUser.toLowerCase())
      );
      const getUserInitials = (name) => {
            return name
                  .split(' ')
                  .map(part => part.charAt(0))
                  .join('')
                  .toUpperCase();
      };
      const getUserColor = (name) => {
            const colors = [
                  "rgba(79, 70, 229, 0.9)",
                  "rgba(16, 185, 129, 0.9)",
                  "rgba(245, 158, 11, 0.9)",
                  "rgba(239, 68, 68, 0.9)",
                  "rgba(59, 130, 246, 0.9)",
                  "rgba(236, 72, 153, 0.9)"
            ];

            const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
            return colors[charSum % colors.length];
      };

      const deleteByUserId = async (id, role) => {
            if (role === "ROLE_ADMIN") {
                  const confirmDelete = window.confirm(
                        "This user is an admin. Are you sure you want to delete?"
                  );
                  if (!confirmDelete) {
                        return;
                  }
            }
            try {
                  const response = await deleteUser(id);
                  setUsers(prevUser => prevUser.filter(user => user.userId !== id));
                  if (response.status === 204) {
                        toast.success("User deleted successfully");
                  }
                  else {
                        toast.error("Unable to delete user");
                  }
            }
            catch (error) {
                  console.error("Error deleting user:", error);
                  toast.error("Unable to delete user");
            }
      }

      return (
            <div className="category-list-container">
                  <div className="row pe-2 mb-2">
                        <div className="col-12">
                              <div className="input-group search-container">
                                    <input
                                          type="text"
                                          name="keyword"
                                          id="keyword"
                                          className="form-control search-input"
                                          placeholder="Search users..."
                                          onChange={(e) => setSearchUser(e.target.value)}
                                          value={searchUser}
                                    />
                                    <span className="btn btn-warning ">
                                          <i className="bi bi-search"></i>
                                    </span>
                              </div>
                        </div>
                  </div>
                  <div className="row g-3 pe-2">
                        {filtredUsers.map((user, index) => (
                              <div key={index} className="col-12">
                                    <div className="user-card">
                                          <div className="card-body p-3">
                                                <div className="d-flex align-items-center">
                                                      <div
                                                            className="user-avatar"
                                                            style={{
                                                                  backgroundColor: getUserColor(user.name),
                                                                  boxShadow: `0 4px 12px ${getUserColor(user.name).replace('0.9', '0.4')}`
                                                            }}
                                                      >
                                                            {getUserInitials(user.name)}
                                                      </div>
                                                      <div className="user-info">
                                                            <h5 className="user-name">
                                                                  {user.name}
                                                            </h5>
                                                            <div className="user-email">
                                                                  <i className="bi bi-envelope me-2"></i>
                                                                  <span>{user.email}</span>
                                                            </div>
                                                            {user.role && (
                                                                  <div className="mt-2">
                                                                        <span className="role-badge">
                                                                              {user.role.replace('ROLE_', '')}
                                                                        </span>
                                                                  </div>
                                                            )}
                                                      </div>
                                                      <button
                                                            className="delete-button"
                                                            onClick={() => deleteByUserId(user.userId, user.role)}>
                                                            <i className="bi bi-trash"></i>
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
}

export default UserList;