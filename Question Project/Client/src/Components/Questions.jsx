import { useEffect, useState } from "react";
import Question from "./Question";

const Questions = () => {
  const [questions, setquestions] = useState([]);
  useEffect(() => {
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
  return (
    <div>
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
