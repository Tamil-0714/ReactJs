import { useEffect, useState } from "react";
import "./css/App.css";
import Login from "./Components/Login";
import Questions from "./Components/Questions";

function App() {
  const [isLogin, setisLogin] = useState(false);
  const [userKey, setuserKey] = useState("not found");

  useEffect(() => {
    const storedUser = localStorage.getItem("userKey");
    if (storedUser && storedUser !== "not found") {
      setuserKey(JSON.parse(storedUser));
    }
  }, []);
  const handleIsLogin = (isValid, userData) => {
    setisLogin(isValid);
    localStorage.setItem("userKey", JSON.stringify(userData.userKey));
  };

  return (
    <>
    {console.log(userKey)}
      <div className="app">
        {isLogin ? (
          <Questions />
        ) : userKey === "not found" ? (
          <Login onLogin={handleIsLogin} />
        ) : (
          <Login secreatLogin={userKey} onLogin={handleIsLogin} />
        )}

        {/* {isLogin ? <Questions />: <Login onLogin={handleIsLogin}/>} */}

        {/* <Questions/> */}
      </div>
    </>
  );
}

export default App;
