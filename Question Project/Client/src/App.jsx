import { useEffect, useState } from "react";
import "./css/App.css";
import Login from "./Components/Login";
import Questions from "./Components/Questions";

function App() {
  const [isLogin, setisLogin] = useState(null);
  const [userDataToQuestion, setuserDataToQuestion] = useState(null);
  const [invalidCrediantials, setinvalidCrediantials] = useState(false);

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
        handleIsLogin(true, data);
      } else {
        handleIsLogin(false, data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("userKey");
      try {
        if (storedUser && storedUser !== "undefined") {
          // console.log(storedUser);
          // const formData = {
          //   key: storedUser,
          // };
          const formData = {
            id: false,
            name: false,
            pass: false,
            phone: false,
            key: storedUser,
          };
          await validateUser(formData);
        } else {
          setisLogin(false);
        }
      } catch (error) {
        console.error(error + ": error message ");
        setisLogin(false);
      }
    };
    fetchData();
  }, []);
  const handleIsLogin = (isValid, userData) => {
    setisLogin(isValid);
    if (!userData.success) {
      setinvalidCrediantials(true);
    } else {
      localStorage.setItem("userKey", userData.result.privateKey);
      setuserDataToQuestion(userData.result);
      setinvalidCrediantials(false);
    }
  };

  if (isLogin === null) {
    return (
      <center>
        <h3>Loading ....</h3>
      </center>
    );
  }
  if (isLogin) {
    return <Questions usersData={userDataToQuestion} />;
  }
  return (
    <Login onLogin={handleIsLogin} invalidCrediantials={invalidCrediantials} />
  );

  // return <Login onLogin={handleIsLogin} />;

  return (
    <>
      <div className="app">
        {isLogin ? <Questions /> : <Login onLogin={handleIsLogin} />}
      </div>
    </>
  );
}

export default App;

{
  /* {isLogin ? (
          <Questions />
        ) : userKey === "not found" ? (
          <Login onLogin={handleIsLogin} />
        ) : (
          <Login secreatLogin={userKey} onLogin={handleIsLogin} />
        )} */
}

// const [userKey, setuserKey] = useState("not found");
// const [validUser, setvalidUser] = useState(false);
