import { useRef, useState, useEffect } from "react";
import "./App.css";
import Pill from "./Pill.jsx";

function App() {
  const [serachTerm, setserachTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setselectedUserSet] = useState(new Set());
  const inputRef = useRef(null);

  useEffect(() => {
    function fetchUsers() {
      if (serachTerm.trim() === "") {
        setSuggestion([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${serachTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestion(data))
        .catch((error) => console.error(error));
    }
    fetchUsers();
  }, [serachTerm]);
  const handleSelectUser = (user) => {
    setSelectedUser([...selectedUser, user]);
    setserachTerm("");
    setSuggestion([]);
    setselectedUserSet(new Set([...selectedUserSet, user.email]));
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUser = selectedUser.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUser(updatedUser);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setselectedUserSet(updatedEmails);
  };

  function handleKeyDown(e) {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUser.length > 0
    ) {
      handleRemoveUser(selectedUser[selectedUser.length - 1]);
      setSuggestion([]);
    }
  }

  return (
    <div className="user-search-container">
      <div className="user-select-input">
        {/* pills */}
        {/* <Pill/> */}
        {selectedUser.map((user, key) => {
          return (
            <Pill
              name={`${user.firstName} ${user.lastName}`}
              image={user.image}
              key={user.email}
              onClick={() => {
                handleRemoveUser(user);
              }}
            />
          );
        })}
        {/* input fields */}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={serachTerm}
            onChange={(e) => setserachTerm(e.target.value)}
            placeholder="Select Persons"
            onKeyDown={handleKeyDown}
          />
          {/* serch suggestion */}
          <ul className="suggestion">
            {suggestion?.users?.map((val, key) => {
              return !selectedUserSet.has(val.email) ? (
                <li
                  key={val.email}
                  onClick={() => {
                    handleSelectUser(val);
                  }}
                >
                  <img
                    src={val.image}
                    alt={`${val.firstName} ${val.lastName}`}
                  />
                  <span>
                    {val.firstName} {val.lastName}
                  </span>
                </li>
              ) : (
                <></>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
