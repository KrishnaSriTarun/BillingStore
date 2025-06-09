import { useState } from "react";
import toast from "react-hot-toast";
import { addUser } from "../../Service/UserService";

function UserForm({ setUsers }) {
      const [loading, setLoading] = useState(false);
      const [data, setData] = useState({
            name: "",
            email: "",
            password: "",
            role: "ROLE_USER",
      });

      const onChangeHandle = (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setData((data) => ({ ...data, [name]: value }));
      };

      const onSubmitHandler = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                  const response = await addUser(data);
                  setUsers((prevUsers) => [...prevUsers, response.data]);
                  toast.success("User added successfully");
                  setData({
                        name: "",
                        email: "",
                        password: "",
                        role: "ROLE_USER",
                  });
            } catch (error) {
                  console.error("Error adding user:", error);
                  const errorMessage = error?.response?.data;
                  if (errorMessage && errorMessage.includes("Email is already registered")) {
                        toast.error("User with this email already exists");
                  } else {
                        toast.error("Unable to add user");
                  }
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="mx-2 mt-2">
                  <div className="row justify-content-center">
                        <div className="card col-12 col-md-12 form-container">
                              <div className="card-body">
                                    <form onSubmit={onSubmitHandler}>
                                          <div className="mb-3">
                                                <label htmlFor="name" className="form-label">
                                                      Name
                                                </label>
                                                <input
                                                      type="text"
                                                      name="name"
                                                      id="name"
                                                      className="form-control"
                                                      placeholder="Jhon Doe"
                                                      onChange={onChangeHandle}
                                                      value={data.name}
                                                      required
                                                />
                                          </div>
                                          <div className="mb-3">
                                                <label htmlFor="email" className="form-label">
                                                      Email
                                                </label>
                                                <input
                                                      type="email"
                                                      name="email"
                                                      id="email"
                                                      className="form-control"
                                                      placeholder="yourname@example.com"
                                                      onChange={onChangeHandle}
                                                      value={data.email}
                                                      required
                                                />
                                          </div>
                                          <div className="mb-3">
                                                <label htmlFor="password" className="form-label">
                                                      Password
                                                </label>
                                                <input
                                                      type="password"
                                                      name="password"
                                                      id="password"
                                                      className="form-control"
                                                      placeholder="********"
                                                      onChange={onChangeHandle}
                                                      value={data.password}
                                                      required
                                                />
                                          </div>
                                          <button
                                                type="submit"
                                                className="btn btn-warning w-100"
                                                disabled={loading}
                                          >
                                                {loading ? "Loading...." : "Sign up"}
                                          </button>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default UserForm;
