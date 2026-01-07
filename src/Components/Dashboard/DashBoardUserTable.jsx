import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import Spinner from "../../Page/Spinner";

const DashboardUsersTable = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const token = await user.getIdToken();
      const res = await fetch("http://localhost:3000/dashboard/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    };
    loadUsers();
  }, [user]);

  if (loading) return <Spinner />;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="text-xl font-bold mb-4">All Users</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-b">
              <td>{u.email}</td>
              <td>{u.role || "user"}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardUsersTable;
