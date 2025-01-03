export default function Card(props) {
  const { data } = props;

  return (
    <div className="card" onClick={(e) => handleImgClick(e, props)}>
      <img
        id={data.code}
        className="emoji"
        src={data.image}
        style={{ width: '10rem', height: '10rem' }}
        alt={data.annotation}
        title={data.annotation}
      />
      <figcaption className="emoji-name">{data.annotation}</figcaption>
    </div>
  );
}

function handleImgClick(e, props) {
  let {
    imgClicks,
    setImgClicks,
    score,
    setScore,
    bestScore,
    setBestScore,
    wholeData,
    setData,
    setIsGameOn,
  } = props;
  let id = e.target.id;
  let newScore = score + 1;

  setIsGameOn(true);

  if (imgClicks.has(id)) {
    alert(`You clicked the same emoji twice, you lost. Score: ${score}`);
    newScore = 0;
    setScore(newScore);
    setImgClicks(new Set());
    setIsGameOn(false);
  } else if (newScore === wholeData.length) {
    alert(`You won the memory game. Score: ${newScore}`);
    setBestScore(newScore);
    newScore = 0;
    setScore(newScore);
    setImgClicks(new Set());
    setData(shuffleArray(wholeData));
    setIsGameOn(false);
    return;
  } else {
    setImgClicks(imgClicks.add(id));
    setScore(newScore);
  }
  setBestScore(Math.max(bestScore, newScore));
  setData(shuffleArray(wholeData));
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
