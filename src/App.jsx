import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';

export default function App() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [imgClicks, setImgClicks] = useState(new Set());

  useEffect(() => {
    fetch('/.netlify/functions/fetchEmoji?search=smile')
      .then((response) => response.json())
      .then((data) =>
        setData(
          data.filter(
            (el) =>
              !el.annotation.includes('eyes') &&
              !el.annotation.includes('cat') &&
              !el.hexcode.includes('1f608')
          )
        )
      )
      .catch((error) => console.error('Error fetching emojis:', error));
  }, []);

  return (
    <div id="app-container">
      <div id="scores">
        <h1>Score: {score}</h1>
        <h3>Best Score: {bestScore}</h3>
      </div>
      <div id="cards-container">
        {data &&
          data.map((d) => (
            <Card
              key={d.hexcode}
              data={d}
              wholeData={data}
              setData={setData}
              imgClicks={imgClicks}
              setImgClicks={setImgClicks}
              score={score}
              setScore={setScore}
              bestScore={bestScore}
              setBestScore={setBestScore}
            />
          ))}
      </div>
    </div>
  );
}
