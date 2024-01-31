import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("hellow");
      try {
        const res = await fetch("http://localhost:4050/fetchUsers");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setUserData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); 
  return (
    <>
      <div className="cardsContainer">
        {userData &&
          userData.map((user, index) => {
            // console.log(user, index);
            return <Card key={index} user={user} />;
          })}
      </div>
    </>
  );
}

export default App;
