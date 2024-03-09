const express = require("express");
const app = express();
const cors = require("cors");
const {
  fetchUsers,
  fetchQuestion,
  insertUserKey,
  fetchUsersWithKey,
  fetchAnswers,
  insertAnswer,
} = require("./models/DB.js");
const port = 7080;

app.use(cors());
app.use(express.json());

app.get("/questions", async (req, res) => {
  res.json(await fetchQuestion());
  return;
});

app.get("/answers", async (req, res) => {
  const userKey = req.query.userKey;
  try {
    const result = await fetchAnswers(userKey);
    ansArr = JSON.parse(result[0].answers);
    res.json(ansArr);
    return;
  } catch (error) {
    console.error("too many connection error occured", error);
  }
});

app.post("/answers", async (req, res) => {
  const data = req.body.ansStr;
  const userKey = req.body.userKey;
  const result = await insertAnswer(data, userKey);
  res.json(result);
});


app.post("/auth", async (req, res) => {
  const formData = req.body;
  try {
    validatedRes = await validFormData(formData);
    if (validatedRes.resultStatus && validatedRes.cotainKey) {
      try {
        const result = validatedRes.result;
        res.json({ success: true, message: "user foud", result: result }); // sending result
        return;
      } catch (error) {
        console.error(error);
      }
    } else if (validatedRes.resultStatus && !validatedRes.cotainKey) {
      userKey = genereateUserKey();
      await insertUserKey(userKey, formData.id);
      const result = {
        userId: validatedRes.result.userId,
        userName: validatedRes.result.userName,
        passowrd: validatedRes.result.passowrd,
        phone: validatedRes.result.phone,
        answers: validatedRes.result.answers,
        privateKey: userKey,
      };
      res.json({ success: true, message: "User found", result: result }); // sending result
      return;
    } else {
      const result = {
        userId: false,
        userName: false,
        passowrd: false,
        phone: false,
        privateKey: "undefined",
      };
      res.json({
        success: false,
        message: "User not found",
        result: result,
      }); // sending result
    }
  } catch (error) {
    console.error(error);
  }
});
const genereateUserKey = () => {
  const str = "#XxYyZzJjIiLlUu123*54!^Tt";
  let usrky = ``;
  for (let i = 0; i < 16; i++) {
    usrky += str[Math.floor(Math.random() * str.length)];
  }
  return usrky;
};

async function validFormData(formData) {
  if (formData.key) {
    try {
      const [result] = await fetchUsersWithKey(formData.key);
      if (result)
        return { resultStatus: true, cotainKey: true, result: result };
    } catch (error) {
      console.error(error);
      return { resultStatus: false, cotainKey: false, result: false };
    }
    return { resultStatus: false, cotainKey: false, result: false };
  }
  try {
    const [result] = await fetchUsers(formData.id);
    if (
      result &&
      result.passowrd === formData.pass &&
      result.phone == formData.phone &&
      result.userName === formData.name
    ) {
      return { resultStatus: true, cotainKey: false, result: result };
    }
  } catch (eror) {
    console.error(eror);
    return { resultStatus: false, cotainKey: false, result: false };
  }
  return { resultStatus: false, cotainKey: false, result: false };
}

app.listen(port, () => {
  console.log(`app running on http://localhost${port}`);
});
