import React from "react";

const Question = ({ question, options, id }) => {
  // optios.indexOf(optios[3])+1
  const handleAnswerChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
  };
  return (
    <div 
    className="question-container">
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
            onChange={(e) => handleAnswerChange(e)}
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
            onChange={(e) => handleAnswerChange(e)}
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
            onChange={(e) => handleAnswerChange(e)}
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
            onChange={(e) => handleAnswerChange(e)}
          />
          {options[3]}
        </label>
        <br />
      </fieldset>
    </div>
  );
};

export default Question;
