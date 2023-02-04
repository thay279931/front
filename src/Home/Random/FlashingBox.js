//閃爍框
import { useEffect, useState } from 'react';

function FlashingBox({
  radomArrays,
  setStartFlashing,
  startFlashing,
  setFlashingEnd,
  flashingEnd,
  pressedTimes,
  gettedShopName,
}) {
  const [count, setCount] = useState(0);
  const interVals = () => {
    setCount((v) => {
      if (v < 30) return v + 1;
      else return 1;
    });
  };
  useEffect(() => {
    const intervalSet = setInterval(interVals, 50);
    setTimeout(() => {
      clearInterval(intervalSet);
      setFlashingEnd(true);
      // setStartFlashing(false);
    }, 50 * 30);
    return () => {
      clearInterval(intervalSet);
    };
  }, [startFlashing, radomArrays]);
  useEffect(() => {
    return () => {
      setCount(0);
      setStartFlashing(false);
    };
  }, []);
  return (
    <>
      <div className="randomFlashingBox h150 w100p of-h flexSetCenter">
        <p className="randomFlashingTexts">
          {radomArrays[count] && !flashingEnd
            ? radomArrays[count].name
            : gettedShopName}
        </p>
      </div>
    </>
  );
}
export default FlashingBox;
