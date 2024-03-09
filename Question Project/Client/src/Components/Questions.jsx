import { useEffect, useState } from "react";
import Question from "./Question";
import "../css/Questions.css";
import { API_BASE_URL } from "../config";

const Questions = ({ usersData }) => {
  const [userName, setuserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [questions, setquestions] = useState([]);
  const [answer, setanswer] = useState([]);
  const [navToggled, setNavToggles] = useState(false)
  useEffect(() => {
    try {
      setUserId(usersData.userId);
      setuserName(usersData.userName);
    } catch (error) {
      console.error(error);
    }
    async function fetchQuestions() {
      try {
        const data = await fetch(`${API_BASE_URL}/questions`);
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
  // console.log("From anser",answer);
  const handleLogout = () => {
    localStorage.setItem("userKey", "undefined");
    location.reload();
  };
  // document.addEventListener("click",handleToggleNav)
  const handleToggleNav = () => {
    setNavToggles(!navToggled)
    
  }

  // const handleDocumentClick = (e)=>{
  //   if (!e.target.closest('.heading-container')) {
  //     setNavToggles(false);
  //   }
  // }
  // useState(()=>{
  //   document.addEventListener("click",handleDocumentClick)
  //   return ()=>{
  //     document.removeEventListener("click",handleDocumentClick)
  //   }
  // },[])
  // console.log(answer);
  return (
    <div>
      <nav className="nav-container">
        <div className="hambuger-container" onClick={handleToggleNav}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="lin3"></div>
        </div>
        <div className="heading-container">
          <h3>🈶From the Begi. to End. is....🈹</h3>
        </div>
        <div className={navToggled ? "user-container" : "user-container user-container-hide"}>
          <h2 className="userName">{userName}</h2>
          <h4 className="userName">{userId}</h4>
          <div className="button-container">
            <button className="logout-btn" onClick={handleLogout}>
              LogOut
            </button>
          </div>
        </div>
      </nav>
      <form className="form-wrapper">
        <div className="questions-container">
        {questions.map((val, id) => {
          return (
            <Question
              question={val.question}
              question_type={val.question_type}
              answer={answer[id]}
              fullAnswer={answer}
              setParentAnswer={setanswer}
              options={JSON.parse(val.options)}
              id={id}
              key={id}
            />
          );
        })}
        </div>
      </form>
    </div>
  );
};

export default Questions;
