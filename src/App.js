import React, { useState, useEffect } from "react";
import "./App.css";
import Circle from "./components/Circle";

function generateHexColor() {
  let r = Math.floor(Math.random() * 255)
      .toString(16)
      .toUpperCase(),
    g = Math.floor(Math.random() * 255)
      .toString(16)
      .toUpperCase(),
    b = Math.floor(Math.random() * 255)
      .toString(16)
      .toUpperCase();

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;
  return "#" + r + g + b;
}

function App() {
  const [difficulty, setDifficulty] = useState(2);
  const [circles, setCircles] = useState([]);
  const [answer, setAnswer] = useState("");
  const [selected, setSelected] = useState("");
  const [winner, setWinner] = useState(false);
  const [replay, setReplay] = useState(true);

  useEffect(() => {
    if (selected && selected === answer) {
      setWinner(true);
      setDifficulty(difficulty + 1);
    } else if (selected && selected !== answer) {
      removeWrongAnswer();
    }
    setSelected(null);
  }, [selected]);

  function clickOnColor(color) {
    setSelected(color);
  }

  function generateCircles() {
    const circles = [];

    for (let i = 0; i < difficulty; i++) {
      const color = generateHexColor();
      circles.push(
        <Circle
          key={"circle:" + i}
          onClick={color => clickOnColor(color)}
          color={color}
        />
      );
    }
    return circles;
  }

  function removeWrongAnswer() {
    if (!winner)
      setCircles(circles.filter(circle => circle.props.color !== selected));
  }

  function displayAnswer() {
    return <Circle onClick={initialize} color={answer} />;
  }

  function initialize() {
    const generatedCircles = generateCircles();
    const answer = generatedCircles[Math.floor(Math.random() * difficulty)];

    setCircles(generatedCircles);
    setAnswer(answer.props.color);
    setSelected(null);
    setWinner(false);
    setReplay(false);
  }

  if (replay) initialize();

  return (
    <div className="App">
      <span className="guessColor" style={{ color: winner ? answer : "grey" }}>
        {answer}
      </span>
      <div className="choices">{circles}</div>
      {winner && displayAnswer()}
      <span className="guessColor">GUESS THE COLOR</span>
    </div>
  );
}

export default App;
