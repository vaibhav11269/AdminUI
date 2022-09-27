import config from './conf/config.js';
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Table from "./components/Table";
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        config.backendEndpoint
      );
      setLoading(false);
      setUsers(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    return users;
  };
  return (
    <>
      <Table users={users} setUsers={setUsers} loading={loading}/>
    </>
  );
}

export default App;
