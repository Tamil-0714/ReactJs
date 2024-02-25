const express = require("express");
const app = express();
const cors = require("cors");
const {
  fetchUsers,
  fetchQuestion,
  insertUserKey,
  fetchUsersWithKey,
  fetchAnswers,
  insertAnswer
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
  const result = await fetchAnswers(userKey);
  ansArr = JSON.parse(result[0].answers);
  res.json(ansArr);
});
app.post("/answers", async (req, res) => {
  const data = req.body.ansStr
  const userKey = req.body.userKey
  const result = await insertAnswer(data, userKey);
  // console.log(result);
  res.json(result)
  // console.log("body data",typeof(data[0]));
});
console.log("changed");

app.post("/auth", async (req, res) => {
  const formData = req.body;
  try {
    validatedRes = await validFormData(formData);
    if (validatedRes && validatedRes.cotainKey) {
      try {
        const [result] = await fetchUsersWithKey(formData.key);
        // console.log("key presented", result);
        /*
            key presented {
                        userId: 'Tamil_0714',
                        userName: 'Tamil',
                        passowrd: '123@abcd',
                        phone: '9943112938',
                        answers: '["a","d","b","b","c"]',
                        privateKey: 'j511iL^lyuJ52*xx'
            }
         */
        res.json({ success: true, message: "user foud", result: result }); // sending result
        return;
      } catch (error) {
        console.error(error);
      }
    } else if (validatedRes) {
      // console.log("new user form data", formData);

      /*
          new user form data {
               id: 'Tamil_0714',
               name: 'Tamil',
               pass: '123@abcd',
               phone: '9943112938',
               key: false
          }

       */
      userKey = genereateUserKey();
      await insertUserKey(userKey, formData.id);
      const result = {
        userId: formData.id,
        userName: formData.name,
        passowrd: formData.pass,
        phone: FormData.phone,
        privateKey: userKey,
      };
      console.log("this result ", result);
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

  // if (await validFormData(formData)) {
  // } else
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
      if (result) return { resultStatus: true, cotainKey: true };
    } catch (error) {
      console.error(error);
      return false;
    }
    return false;
  }
  try {
    const [result] = await fetchUsers(formData.id);
    if (
      result &&
      result.passowrd === formData.pass &&
      result.phone === formData.phone &&
      result.userName === formData.name
    ) {
      return true;
    }
  } catch (eror) {
    console.error(eror);
    return false;
  }
  return false;
}

app.listen(port, () => {
  console.log(`app running on http://localhost${port}`);
});
