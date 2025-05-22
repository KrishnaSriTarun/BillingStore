import { useEffect, useState } from 'react';
import UserForm from '../../Components/UserForm/UserForm';
import UserList from '../../Components/UserList/UserList';
import './ManageUsers.css';
import toast from 'react-hot-toast';
import { fetchUsers } from './../../Service/UserService';
function ManageUsers() {
      const [users, setUsers] = useState([]);
      
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            async function getUsers() {
                  try{
                        setLoading(true);
                        const response=await fetchUsers();
                        setUsers(response.data);
                  }
                  catch (error) {
                        console.error("Error fetching users:", error);
                        toast.error("Unable to fetch users");
                  }
                  finally {
                        setLoading(false);
                  }
            }
            getUsers();
      }, []);
      return (
            <div className="users-container text-light">
                  <div className="left-column">
                        <UserForm setUsers={setUsers}/>
                  </div>
                  <div className="right-column">
                        <UserList users={users} setUsers={setUsers}/>
                  </div>
            </div>
      );
}

export default ManageUsers;