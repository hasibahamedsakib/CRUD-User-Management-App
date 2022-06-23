import { useState } from "react";
import style from "./app.module.css";
import UserForm from "./components/UserForm";
import UseFetch from "./Hook/useFetch";

const URL = "http://localhost:4000/users/";
const CrudOperation = () => {
  const { users, isLoading, error, getAllUsers } = UseFetch(URL);

  const [isSelectUser, setIsSelectUser] = useState({
    username: "",
    email: "",
  });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [onlyId, setOnlyId] = useState("");
  const handleUpdate = (id) => {
    setOnlyId(id);
    setUpdateFlag(true);
    const filteredUser = users.filter((user) => user.id === id);
    setIsSelectUser({
      username: filteredUser[0].username,
      email: filteredUser[0].email,
    });
  };
  const handleSubmitUser = (user) => {
    fetch(URL + `${onlyId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error();
        }
        getAllUsers();
        setUpdateFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    fetch(URL + `${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };
  const addUser = (user) => {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 201) {
          getAllUsers();
        } else {
          throw new Error();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 className={style.h1}>CrudOperation</h2>
      {updateFlag ? (
        <UserForm
          btnText={"Update"}
          isSelectUser={isSelectUser}
          dataSubmit={handleSubmitUser}
        />
      ) : (
        <UserForm btnText={"Add User"} dataSubmit={addUser} />
      )}
      {isLoading && <h3>Server is Loading.....</h3>}
      {error && <h3>{error.message}</h3>}

      <section>
        {users &&
          users.map((user) => {
            const { id, username, email } = user;
            return (
              <article key={id} className={style.card}>
                <h3>Name : {username}</h3>
                <p>Email : {email}</p>
                <button onClick={() => handleUpdate(id)}>Edit</button>
                <button onClick={() => handleDelete(id)}>Delete</button>
              </article>
            );
          })}
      </section>
    </div>
  );
};

export default CrudOperation;
