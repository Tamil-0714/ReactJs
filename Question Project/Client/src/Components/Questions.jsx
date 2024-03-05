import { useEffect, useState } from "react";
import Question from "./Question";

const Questions = ({ usersData }) => {
  const [userName, setuserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [questions, setquestions] = useState([]);
  const [answer, setanswer] = useState([]);

  useEffect(() => {
    try {
      setUserId(usersData.userId);
      setuserName(usersData.userName);
    } catch (error) {
      console.error(error);
    }
    async function fetchQuestions() {
      try {
        const data = await fetch("http://192.168.233.160:7080/questions");
        const res = await data.text();
        const q_l = JSON.parse(res).length;
        setquestions(JSON.parse(res));
        const ansarr = JSON.parse(usersData.answers);
        setanswer(ansarr.concat(Array(q_l - ansarr.length).fill("")));
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuestions();
  }, []);

  const handleLogout = () => {
    localStorage.setItem("userKey", "undefined");
    location.reload();
  };
  // console.log(answer);
  return (
    <div>
      <div className="user-container">
        <h2 className="userName">{userName}</h2>
        <h4 className="userName">{userId}</h4>
        <button className="logout-btn" onClick={handleLogout}>
          LogOut
        </button>
      </div>
      <form>
        {questions.map((val, id) => {
          return (
            <Question
              question={val.question}
              answer={answer[id]}
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
