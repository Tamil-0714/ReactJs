import { useState, useEffect } from "react";
import "../css/Login.css";
import { API_BASE_URL } from "../config";

const Login = ({ onLogin, invalidCrediantials }) => {
  const [phoneNumber, setphoneNumber] = useState("");
  const [userId, setuserId] = useState("");
  const [userUame, setuserName] = useState("");
  const [passowrd, setpassowrd] = useState("");
  const handcleChangePhoneNumber = (e) => {
    let newPhoneNumber = e.target.value.split(" ").join("").trim();
    if (newPhoneNumber.length <= 10) {
      let cleanedNumber = +newPhoneNumber;
      if (!isNaN(cleanedNumber)) {
        setphoneNumber(newPhoneNumber);
      }
    }
  };
  const handcleChangeuserId = (e) => {
    let newUserId = e.target.value.split(" ").join("").trim();
    if (newUserId.length <= 11) {
      let cleanedId = newUserId;
      if (cleanedId.length >= 0) {
        setuserId(newUserId);
      }
    }
  };
  const handcleChangeuserPass = (e) => {
    let newUserPass = e.target.value.split(" ").join("").trim();
    if (newUserPass.length <= 12) {
      let cleanedPass = newUserPass;
      if (cleanedPass.length >= 0) {
        setpassowrd(newUserPass);
      }
    }
  };
  const handcleChangeuserName = (e) => {
    let newUserName = e.target.value.split(" ").join("").trim();
    if (newUserName.length <= 10) {
      let cleanedName = newUserName;
      if (cleanedName.length >= 0) {
        setuserName(newUserName);
      }
    }
  };

  const validateUser = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // formData.userKey = data.userKey;
      if (data.success) {
        onLogin(true, data);
      } else {
        onLogin(false, data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const formData = {
      id: userId,
      name: userUame,
      pass: passowrd,
      phone: phoneNumber,
      key: false,
    };
    console.log(formData)
    await validateUser(formData);
  };

  return (
    <div className="form-container">
      <form action="/login" className="login-form" onSubmit={handleAuth}>
        <h3 className="h3">Login to answer the questions</h3>
        <input
          type="text"
          placeholder="User Id"
          name="id"
          className={
            invalidCrediantials ? "login-input invalidInput" : "login-input"
          }
          value={userId}
          autoComplete="off"
          onChange={(e) => handcleChangeuserId(e)}
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          className={
            invalidCrediantials ? "login-input invalidInput" : "login-input"
          }
          value={userUame}
          autoComplete="off"
          onChange={(e) => handcleChangeuserName(e)}
        />
        <input
          type="password"
          placeholder="Passowerd"
          name="pass"
          className={
            invalidCrediantials ? "login-input invalidInput" : "login-input"
          }
          value={passowrd}
          autoComplete="off"
          onChange={(e) => handcleChangeuserPass(e)}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          className={
            invalidCrediantials ? "login-input invalidInput" : "login-input"
          }
          value={phoneNumber}
          autoComplete="off"
          onChange={(e) => {
            handcleChangePhoneNumber(e);
          }}
        />
        <button className="login-button" type="sumbit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
