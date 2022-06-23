import { useEffect, useState } from "react";
import style from "./Form.module.css";
const UserForm = ({ btnText, dataSubmit, isSelectUser }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const { username, email } = user;

  useEffect(() => {
    setUser({
      username: isSelectUser.username,
      email: isSelectUser.email,
    });
  }, [isSelectUser]);

  const handleChange = (e) => {
    const selectedFild = e.target.name;
    const selectedValue = e.target.value;
    setUser((prevState) => {
      return { ...prevState, [selectedFild]: selectedValue };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username: "", email: "" });
    dataSubmit(user);
  };

  return (
    <div className={style.userForm}>
      <form onSubmit={handleSubmit}>
        <div className="name">
          <label htmlFor="username">User Name : </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="email">
          <label htmlFor="email">User Email : </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{btnText}</button>
      </form>
    </div>
  );
};

UserForm.defaultProps = {
  isSelectUser: {
    username: "",
    email: "",
  },
};

export default UserForm;
