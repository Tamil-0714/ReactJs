import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
// const ans = ["", "", "", "", ""];

const Question = ({
  question,
  question_type,
  answer,
  fullAnswer,
  setParentAnswer,
  options,
  id,
}) => {
  // optios.indexOf(optios[3])+1
  // console.log(question_type);
  const getAnswer = async () => {
    const userKey = localStorage.getItem("userKey");
    const url = `${API_BASE_URL}/answers`;
    try {
      if (userKey && userKey !== "undefined") {
        const response = await axios.get(url, {
          params: {
            userKey: userKey,
          },
        });
        const ansArr = response.data;
        return ansArr;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const setAnswer = async (ans) => {
    const userKey = localStorage.getItem("userKey");
    const ansStr = JSON.stringify(ans);

    const url = `${API_BASE_URL}/answers`;
    try {
      if (userKey && userKey !== "undefined") {
        const data = {
          ansStr: ansStr,
          userKey: userKey,
        };
        const response = await axios.post(url, data);
        if (response.data.affectedRows < 1) {
          throw new Error("answer not affected");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAnswerChange = async (e, i) => {
    // console.log(e.target.value);
    const q_i = {
      q1_answer: 0,
      q2_answer: 1,
      q3_answer: 2,
      q4_answer: 3,
      q5_answer: 4,
    };
    const updatedFullArray = [...fullAnswer];
    updatedFullArray[q_i[e.target.name]] = i;
    setParentAnswer(updatedFullArray)

    const ans = await getAnswer();
    ans[q_i[e.target.name]] = i;
    setAnswer(ans);

    // setParentAnswer(i)
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
            checked={answer === "a" ? true : false}
            onChange={(e) => handleAnswerChange(e, "a")}
            style={{
            margin: "10px"
            }}
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
            checked={answer === "b" ? true : false}
            onChange={(e) => handleAnswerChange(e, "b")}
            style={{
            margin: "10px"
            }}
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
            checked={answer === "c" ? true : false}
            onChange={(e) => handleAnswerChange(e, "c")}
            style={{
            margin: "10px"
            }}
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
            checked={answer === "d" ? true : false}
            onChange={(e) => handleAnswerChange(e, "d")}
            style={{
            margin: "10px"
            }}
          />
          {options[3]}
        </label>
        <br />
      </fieldset>
    </div>
  );
};

export default Question;
