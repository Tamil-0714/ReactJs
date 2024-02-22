import { useEffect, useState } from "react";
import "./css/App.css";
import Login from "./Components/Login";
import Questions from "./Components/Questions";

function App() {
  const [isLogin, setisLogin] = useState(false);
  const [userKey, setuserKey] = useState("not found");
  // const [validUser, setvalidUser] = useState(false);

  const validateUser = async (formData) => {
    try {
      const response = await fetch("http://localhost:7080/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // console.log(data);
      if (data.success) {
        handleIsLogin(true, formData);
      } else {
        handleIsLogin(false, formData);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("userKey"); 
    try {
      if (storedUser !== "undefined") {
        console.log(storedUser);
        // setuserKey(JSON.parse(storedUser));
        const formData = {
          key: storedUser,
        };
        validateUser(formData);
      }
    } catch (error) {
      console.error(error+": error message "); 
    }
  }, []);
  const handleIsLogin = (isValid, userData) => {
    setisLogin(isValid);
    console.log(userData.userKey);
    localStorage.setItem("userKey",userData.userKey);
  };

  return (
    <>
      {/* {console.log(userKey)} */}
      <div className="app">
        {/* {isLogin ? (
          <Questions />
        ) : userKey === "not found" ? (
          <Login onLogin={handleIsLogin} />
        ) : (
          <Login secreatLogin={userKey} onLogin={handleIsLogin} />
        )} */}

        {isLogin ? <Questions /> : <Login onLogin={handleIsLogin} />}

        {/* <Questions/> */}
      </div>
    </>
  );
}

export default App;
