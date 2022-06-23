import { useEffect, useState } from "react";

const UseFetch = (URL) => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllUsers = () => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("featch not successful");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.users);
      })
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, [URL]);
  return { users, isLoading, error, getAllUsers };
};

export default UseFetch;
