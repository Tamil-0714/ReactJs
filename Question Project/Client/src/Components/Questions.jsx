import { useEffect, useState } from "react";
import Question from "./Question";



const Questions = ({usersData}) => {

  const [userName, setuserName] = useState(null)
  const [userId, setUserId] = useState(null)
  const [questions, setquestions] = useState([]);
  
  useEffect(() => {
    console.log(usersData);
    try {
      setUserId(usersData.id)
      setuserName(usersData.name)
    } catch (error) {
      console.error(error);
    }
    async function fetchQuestions() {
      try {
        const data = await fetch("http://localhost:7080/questions");
        const res = await data.text();
        setquestions(JSON.parse(res));
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuestions();
  }, []);

  const handleLogout = ()=>{
    localStorage.setItem("userKey", "undefined");
    location.reload()
  }
  return (
    <div>
      <div className="user-container">
        <h2 className="userName">{userName}</h2>
        <h4 className="userName">{userId}</h4>
        <button className="logout-btn" onClick={handleLogout}>LogOut</button>
      </div>
      <form>
        {questions.map((val, id) => {
          return (
            <Question
              question={val.question}
              options={JSON.parse(val.options)}
              id={id}
              key={id}
            />
          );
        })}
      </form>
    </div>
  );
};

export default Questions;
