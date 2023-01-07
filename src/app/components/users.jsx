import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userID) => {
    setUsers(users.filter((user) => userID !== user._id));
  };
  const renderPhrase = (lenghtUser) => {
    const num = lenghtUser.toString().slice();
    if (lenghtUser > 4 && lenghtUser < 15) return " человек тусанет";
    if ([1, 2, 3, 4] <= num) return "человека тусанут";
    if (num === 1) return " человек тусанет";
    return " человек тусанет";
  };

  return (
    <>
      <h2>
        <span
          className={"badge bg-" + (users.length > 0 ? "primary" : "danger")}
        >
          {users.length > 0
            ? `${users.length} ` +
              renderPhrase(users.length) +
              " с тобой сегодня"
            : "Никто с тобой не тусанет сегодня"}
        </span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((item) => (
                    <span className={"btn btn-" + item.color} key={item._id}>
                      {item.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} /5</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                    className="btn btn-danger"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
