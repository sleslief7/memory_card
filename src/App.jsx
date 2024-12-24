import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';

export default function App() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [imgClicks, setImgClicks] = useState(new Set());
  const [category, setCategory] = useState('smileys_emotion');
  const [isGameOn, setIsGameOn] = useState(false);

  useEffect(() => {
    fetch(`https://api.api-ninjas.com/v1/emoji?group=${category}`, {
      method: 'GET',
      headers: { 'X-Api-Key': import.meta.env.VITE_API_KEY },
    })
      .then((response) => response.json())
      .then((data) => {
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }

        setData(data.slice(0, 10));
      })
      .catch((error) => console.error('Error fetching emojis:', error));
  }, [category]);

  return (
    <div id="app-container">
      <div id="scores">
        <h1>Score: {score}</h1>
        <h3>Best Score: {bestScore}</h3>
      </div>
      <div id="category-container">
        <label htmlFor="category-select" id="category-label">
          Select an emoji category:{' '}
        </label>
        <select
          name="category-select"
          id="category-select"
          onChange={(e) => setCategory(e.target.value)}
          disabled={isGameOn}
        >
          <option value="smileys_emotion">Smiley emoji</option>
          <option value="people_body">People body</option>
          <option value="animals_nature">Animals</option>
          <option value="food_drink">Food</option>
          <option value="flags">Flags</option>
        </select>
      </div>
      <div id="cards-container">
        {data &&
          data.map((d) => (
            <Card
              key={d.code}
              data={d}
              wholeData={data}
              setData={setData}
              imgClicks={imgClicks}
              setImgClicks={setImgClicks}
              score={score}
              setScore={setScore}
              bestScore={bestScore}
              setBestScore={setBestScore}
              isGameOn={isGameOn}
              setIsGameOn={setIsGameOn}
            />
          ))}
      </div>
    </div>
  );
}
