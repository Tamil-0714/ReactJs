const express = require("express");
const app = express();
const cors = require("cors");
const { fetchUsers, fetchQuestion, insertUserKey, fetchUsersWithKey } = require("./models/DB.js");
const port = 7080;

app.use(cors());
app.use(express.json());

app.get("/questions", async (req, res) => {
  res.json(await fetchQuestion());
});
app.post("/auth", async (req, res) => {
  const formData = req.body;
  //   console.log(await validFormData(formData));
  validatedRes = await validFormData(formData)
  console.log("validated result is : ",validatedRes);
  if(validatedRes && validatedRes.cotainKey){
    console.log("im from if box");
    const [result] = await fetchUsersWithKey(formData.key);  
    // res.json({result})    
    console.log(result);
    res.json({ success: true, message: result});
    res.json({ success: true, message: result});
    return;
  }
  if (await validFormData(formData) ){
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
  // console.log(formData);
  if(formData.key){
    const [result] = await fetchUsersWithKey(formData.key);  
    // console.log(result);
    if(result) return {resultStatus:true, cotainKey:true};
    return false
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
