import { useState, useEffect } from "react";
import "../css/Login.css";

const Login = ({ onLogin, secreatLogin }) => {
  const [phoneNumber, setphoneNumber] = useState("");
  const [userId, setuserId] = useState("");
  const [userUame, setuserName] = useState("");
  const [passowrd, setpassowrd] = useState("");
  const [validUser, setvalidUser] = useState(false);
  //   const handcleChangePhoneNumber = (e) => {
  //     if (phoneNumber.length < 10) {
  //       let cndt = +`${e.target.value.split(" ").join("").trim()}`;
  //       if (!isNaN(cndt)) {
  //         setphoneNumber(e.target.value.split(" ").join("").trim());
  //       }
  //     }
  //   };
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
    if (newUserPass.length <= 8) {
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
      secreatLogin !== "not found"
        ? (formData.userKey = secreatLogin)
        : formData;
      const response = await fetch("http://localhost:7080/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // formData.userKey = data.userKey;
      if (data.success) {
        setvalidUser(true);
        onLogin(true, data);
      } else {
        setvalidUser(false);
        onLogin(false, data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // console.log(secreatLogin);
  // if (secreatLogin && secreatLogin !== "not found") {
  //   const formData = {
  //     id: userId,
  //     name: userUame,
  //     pass: passowrd,
  //     phone: phoneNumber,
  //     userKey: secreatLogin,
  //   };
  //   console.log(formData);
  //   validateUser(formData)
  // }

  const handleAuth = async (e) => {
    e.preventDefault();
    const formData = {
      id: userId,
      name: userUame,
      pass: passowrd,
      phone: phoneNumber,
      key: false,
    };
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
          className="login-input"
          value={userId}
          autoComplete="off"
          onChange={(e) => handcleChangeuserId(e)}
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="login-input"
          value={userUame}
          autoComplete="off"
          onChange={(e) => handcleChangeuserName(e)}
        />
        <input
          type="password"
          placeholder="Passowerd"
          name="pass"
          className="login-input"
          value={passowrd}
          autoComplete="off"
          onChange={(e) => handcleChangeuserPass(e)}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          className="login-input"
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
