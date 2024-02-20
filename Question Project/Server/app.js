const express = require("express");
const app = express();
const cors = require("cors");
const { fetchUsers, fetchQuestion, insertUserKey } = require("./models/DB.js");
const port = 7080;

app.use(cors());
app.use(express.json());

app.get("/questions", async (req, res) => {
  res.json(await fetchQuestion());
});
app.post("/auth", async (req, res) => {
  const formData = req.body;
  //   console.log(await validFormData(formData));
  if (await validFormData(formData)){
    userKey = genereateUserKey();
    await insertUserKey(userKey, formData.id)
    res.json({ success: true, message: "User found", userKey:userKey });
  }
  else res.json({ success: false, message: "User not found" ,userKey:"not found"});
});
const genereateUserKey = () => {
  const str = "#XxYyZzJjIiLlUu123*54!^Tt"
  let usrky = ``;
  for(let i=0; i<16; i++){
    usrky += str[Math.floor(Math.random()*str.length)];
  }
  return usrky;
}

async function validFormData(formData) {
  if(formData.key){
    console.log("key presented");
  }
  const [result] = await fetchUsers(formData.id);
  if (
    result &&
    result.passowrd === formData.pass &&
    result.phone === formData.phone &&
    result.userName === formData.name
  ) {
    return true;
  }
  return false;
}

app.listen(port, () => {
  console.log(`app running on http://localhost${port}`);
});
