import React from "react";
import axios from "axios";
// const ans = ["", "", "", "", ""];

const Question = ({ question, options, id }) => {
  // optios.indexOf(optios[3])+1

  const getAnswer = async () => {
    const userKey = localStorage.getItem("userKey");
    const url = `http://localhost:7080/answers`;
    try {
      if (userKey && userKey !== "undefined") {
        const response = await axios.get(url, {
          params: {
            userKey: userKey,
          },
        });
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const setAnswer = async () => {};
  const handleAnswerChange = async (e, i) => {
    // console.log(e.target.value);

    const q_i = {
      q1_answer: 0,
      q2_answer: 1,
      q3_answer: 2,
      q4_answer: 3,
      q5_answer: 4,
    };
    await getAnswer();
    // ans[q_i[e.target.name]] = i;
    // console.log(e.target.name);
    // console.log("Indesx", i);
  };
  return (
    <div className="question-container">
      <fieldset
        style={{
          margin: "10px",
        }}
      >
        {/* <legend></legend> */}
        <h3>{`${id + 1}. ${question}`}</h3>
        <label htmlFor={`q${id + 1}_option${options.indexOf(options[0]) + 1}`}>
          <input
            type="radio"
            id={`q${id + 1}_option${options.indexOf(options[0]) + 1}`}
            name={`q${id + 1}_answer`}
            value={options[0]}
            onChange={(e) => handleAnswerChange(e, "a")}
          />
          {options[0]}
        </label>
        <br />
        <label htmlFor={`q${id + 1}_option${options.indexOf(options[1]) + 1}`}>
          <input
            type="radio"
            id={`q${id + 1}_option${options.indexOf(options[1]) + 1}`}
            name={`q${id + 1}_answer`}
            value={options[1]}
            onChange={(e) => handleAnswerChange(e, "b")}
          />
          {options[1]}
        </label>
        <br />
        <label htmlFor={`q${id + 1}_option${options.indexOf(options[2]) + 1}`}>
          <input
            type="radio"
            id={`q${id + 1}_option${options.indexOf(options[2]) + 1}`}
            name={`q${id + 1}_answer`}
            value={options[2]}
            onChange={(e) => handleAnswerChange(e, "c")}
          />
          {options[2]}
        </label>
        <br />
        <label htmlFor={`q${id + 1}_option${options.indexOf(options[3]) + 1}`}>
          <input
            type="radio"
            id={`q${id + 1}_option${options.indexOf(options[3]) + 1}`}
            name={`q${id + 1}_answer`}
            value={options[3]}
            onChange={(e) => handleAnswerChange(e, "d")}
          />
          {options[3]}
        </label>
        <br />
      </fieldset>
    </div>
  );
};

export default Question;
