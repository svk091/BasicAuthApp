import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../config";
import UsersBoard from "../common/UsersBoard";
interface user {
  firstName: string;
  lastName: string;
  email: string;
}

const Users = () => {
  const [usersFecthed, setUsersFecthed] = useState<user[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await axios({
        method: "get",
        url: `${baseUrl}/api/v1/user/bulkUsers`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setLoading(false);
      setUsersFecthed(res.data.users);
    }
    fetchData();
  }, []);
  return (
    <div>
      <div>{loading && "<h1>Loading<h1/>"}</div>
      <div>{!loading && <UsersBoard users={usersFecthed} />}</div>
    </div>
  );
};

export default Users;
